import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PopoverButton from "../../components/common/PopoverButton";
import CustomLinearProgress from "../../components/common/LinearProgress";
import useQueryUser from "../../hooks/useQueryUser";
import Chip from "@mui/material/Chip";
import Title from "antd/es/skeleton/Title";

const columns = [
  { id: "id", label: "#", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 130 },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
  },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "picture", label: "Avatar", minWidth: 100 },
  { id: "actions", label: "", minWidth: 100 },
];
export default function SimpleTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const getUser = (id, active) => {
    setSelectedId(id);
    setUserStatus(active);
  };
  const theme = createTheme();
  const { isLoading, error, data: users } = useQueryUser();

  if (isLoading) {
    return (
      <div className="max-w-screen-lg">
        <CustomLinearProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-lg">
        <Title level={2}>Lỗi rồi em</Title>
      </div>
    );
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "92%", overflow: "hidden" }}>
        <h2 className="font-medium text-2xl">Users</h2>
        <TableContainer sx={{ maxHeight: 410 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        if (column.id === "role") {
                          let color = "default";
                          if (row.role.id === 1) {
                            color = "primary";
                          } else if (row.role.id === 2) {
                            color = "success";
                          } else if (row.role.id === 3) {
                            color = "secondary";
                          } else if (row.role.id === 4) {
                            color = "warning";
                          }
                          return (
                            <TableCell key={column.id}>
                              <Chip label={row.role.name} color={color} />
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{
                              fontFamily: "Public Sans, sans-serif",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.id === "picture" ? (
                              <Avatar
                                src={value}
                                alt={row.name}
                                sx={{
                                  width: "40px",
                                  height: "40px",
                                }}
                              />
                            ) : column.id === "actions" ? (
                              <div onClick={() => getUser(row.id, row.active)}>
                                <PopoverButton
                                  userStatus={userStatus}
                                  selectedId={selectedId}
                                />
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          color="primary"
          sx={{
            marginTop: "20px",
          }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
}
