/* eslint-disable no-unused-vars */
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import styles from "../../../styles/Dashboard.module.scss";

// import { DataGrid } from "../../shared/DataGrid";
import { Dialog } from "../../shared/Dialog";
// import { StyledButton } from "../../../styles/components/Button";
import { truncate } from "../../../utils/truncate";
import { DataGrid } from "@mui/x-data-grid";
import { PhotoCamera } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const DashboardTable = ({ data = [] }) => {
  const [targetItem, setTargetItem] = React.useState([]);

  const [anchorAcceptButton, setAnchorAcceptButton] = React.useState(null);
  const [anchorRefuseButton, setAnchorRefuseButton] = React.useState(null);

  const openAcceptDialog = Boolean(anchorAcceptButton);
  const openRefuseDialog = Boolean(anchorRefuseButton);

  const handleOpenAcceptDialogClick = (e, params) => {
    e.preventDefault();
    setAnchorAcceptButton(e.currentTarget);
    setTargetItem(params.row);
  };

  const handleOpenRefuseDialogClick = (e, params) => {
    e.preventDefault();
    setAnchorRefuseButton(e.currentTarget);
    setTargetItem(params.row);
  };

  const handleAcceptClick = (e, item) => {
    e.preventDefault();
    // setAnchorAcceptButton(null);
    // acceptRequest(item.id, item.sender);
  };

  const handleCancelAcceptClick = (e) => {
    e.preventDefault();
    setAnchorAcceptButton(null);
  };

  const handleRefuseClick = (e, item) => {
    e.preventDefault();
    // setAnchorRefuseButton(null);
    // refuseRequest(item.id, item.sender);
  };

  const handleCancelRefuseClick = (e) => {
    e.preventDefault();
    setAnchorRefuseButton(null);
  };

  const handleAcceptClose = () => {
    setAnchorAcceptButton(null);
  };

  const handleRefuseClose = () => {
    setAnchorRefuseButton(null);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "bookSample",
      headerName: "Book Sample",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "bookCover",
      headerName: "Book Cover",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "nftUri",
      headerName: "Metadata",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (
        <Typography>{truncate(params.value, 12, -4)}</Typography>
      )
    },
    {
      field: "timestamp",
      headerName: "Time",
      width: 180,
      renderCell: (params) => (
        <Typography>
          {`${new Date(params.value).toLocaleDateString("vi-VN")}, ${new Date(
            params.value
          ).toLocaleTimeString("vi-VN")}`}
        </Typography>
      )
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title={"Read book"}>
              <IconButton
                component="label"
                onClick={() => {
                  // router.push("");
                }}
              >
                {params?.value?.read}
              </IconButton>
            </Tooltip>
            <Tooltip title={"Accept this request"}>
              <IconButton
                component="label"
                onClick={(e) => handleOpenAcceptDialogClick(e, params)}
              >
                {params?.value?.accept}
              </IconButton>
            </Tooltip>
            <Tooltip title={"Refuse this request"}>
              <IconButton
                component="label"
                onClick={(e) => handleOpenRefuseDialogClick(e, params)}
              >
                {params?.value?.refuse}
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }
  ];

  React.useEffect(() => {
    data.forEach((object) => {
      object.action = {
        read: <VisibilityOutlinedIcon />,
        accept: <CheckOutlinedIcon />,
        refuse: <CloseOutlinedIcon />
      };
    });
  }, [data]);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          width: "100%",
          "& .MuiDataGrid-columnHeaders": {
            height: "50px"
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none"
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            lineHeight: "1.5 !important",
            fontWeight: "bold"
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none !important"
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important"
          }
        }}
      >
        <DataGrid
          getRowId={(row) => row.tokenId}
          columns={columns}
          rows={data}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowHeight={() => "auto"}
        />
      </Box>
      <Dialog
        title={"Accept the request"}
        open={openAcceptDialog}
        onClose={handleAcceptClose}
      >
        <Stack spacing={3}>
          <Typography>
            {"Are you sure you want to accept to publish the book?"}
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1">
              <b>{"title"}:</b> {targetItem?.title}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Book Sample"}:</b>{" "}
              <Tooltip title={targetItem?.bookSample}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookSample}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Book Cover"}:</b>{" "}
              <Tooltip title={targetItem?.bookCover}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookCover}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Metadata"}:</b>{" "}
              <Tooltip title={targetItem?.nftUri}>
                <Typography variant="body1" component="span">
                  {targetItem?.nftUri}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>{"Author"}:</b>{" "}
              {targetItem?.author ? truncate(targetItem?.author, 12, -4) : ""}
            </Typography>
            <Typography variant="body1">
              <b>{"Time"}:</b>{" "}
              {targetItem.timestamp &&
                `${new Date(targetItem?.timestamp).toLocaleDateString(
                  "vi-VN"
                )}, ${new Date(targetItem?.timestamp).toLocaleTimeString(
                  "vi-VN"
                )}`}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="end">
            <Button
              customVariant="secondary"
              onClick={(e) => handleCancelAcceptClick(e)}
            >
              {"Cancel"}
            </Button>
            <Button onClick={(e) => handleAcceptClick(e, targetItem)}>
              {"Accept"}
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      <Dialog
        title={"Refuse the request"}
        open={openRefuseDialog}
        onClose={handleRefuseClose}
      >
        <Stack spacing={3}>
          <Typography>
            {"Are you sure you want to refuse to publish the book?"}
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1">
              <b>{"title"}:</b> {targetItem?.title}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Book Sample"}:</b>{" "}
              <Tooltip title={targetItem?.bookSample}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookSample}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Book Cover"}:</b>{" "}
              <Tooltip title={targetItem?.bookCover}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookCover}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>{"Metadata"}:</b>{" "}
              <Tooltip title={targetItem?.nftUri}>
                <Typography variant="body1" component="span">
                  {targetItem?.nftUri}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>{"Author"}:</b>{" "}
              {targetItem?.author ? truncate(targetItem?.author, 12, -4) : ""}
            </Typography>
            <Typography variant="body1">
              <b>{"Time"}:</b>{" "}
              {targetItem.timestamp &&
                `${new Date(targetItem?.timestamp).toLocaleDateString(
                  "vi-VN"
                )}, ${new Date(targetItem?.timestamp).toLocaleTimeString(
                  "vi-VN"
                )}`}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="end">
            <Button
              customVariant="secondary"
              onClick={(e) => handleCancelRefuseClick(e)}
            >
              {"Cancel"}
            </Button>
            <Button onClick={(e) => handleRefuseClick(e, targetItem)}>
              {"Refuse"}
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      <ToastContainer />
    </Stack>
  );
};

export default DashboardTable;
