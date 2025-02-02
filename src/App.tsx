import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CircularProgress } from "@mui/material";
import { IssuesTable } from "./components/IssueTable";

const App = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 13,
  });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/treeverse/lakeFS`);
        const data = await response.json();
        setTotalCount(data.open_issues_count);
      } catch (error) {
        console.error("Error fetching total issue count:", error);
      }
    };

    fetchTotalCount();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/treeverse/lakeFS/issues?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`
        );
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error("Error fetching issues: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [paginationModel]);

  return (
    <div style={{ height: 600, width: "100%", padding: 10, minWidth: "100%" }}>
      <Header />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
          <CircularProgress />
        </div>
      ) : (
        <IssuesTable
          issues={issues}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default App;
