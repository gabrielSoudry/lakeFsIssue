import React, { useCallback } from "react";
import {
  GridColDef,
  GridRowId,
  DataGridPro,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { marked } from "marked";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxHeight: 600,
    maxWidth: "100%",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #ddd",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#e3f2fd",
    },
  },
});

interface Issue {
  id: number;
  number: number;
  title: string;
  body: string;
}

interface IssuesTableProps {
  issues: Issue[];
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  totalCount: number;
}

const IssueDetail: React.FC<{ body: string }> = ({ body }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="body1" component="div">
      <div dangerouslySetInnerHTML={{ __html: marked(body || "") }} />
    </Typography>
  </Box>
);

export const IssuesTable: React.FC<IssuesTableProps> = ({
  issues,
  paginationModel,
  setPaginationModel,
  totalCount,
}) => {
  const classes = useStyles();
  const [expandedRows, setExpandedRows] = React.useState<GridRowId[]>([]);

  const handleExpandClick = (newExpandedRows: GridRowId[]) => {
    setExpandedRows(newExpandedRows);
  };

  const columns: GridColDef[] = [
    { field: "number", headerName: "Issue #", width: 100, flex: 0 },
    { field: "title", headerName: "Title", flex: 1 },
  ];

  const rows = issues.map((issue) => ({
    id: issue.id,
    number: issue.number,
    title: issue.title,
    body: issue.body,
  }));

  const getDetailPanelContent = useCallback(
    ({ row }: { row: Issue }) => <IssueDetail body={row.body} />,
    []
  );

  const getDetailPanelHeight = useCallback(() => "auto", []);

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <DataGridPro
        className={classes.root}
        rows={rows}
        columns={columns}
        density="compact"
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
        detailPanelExpandedRowIds={expandedRows}
        onDetailPanelExpandedRowIdsChange={handleExpandClick}
        pagination
        paginationMode="server"
        rowCount={totalCount}
        pageSizeOptions={[15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};
