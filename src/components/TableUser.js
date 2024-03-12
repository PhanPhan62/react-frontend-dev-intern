import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { Button } from "react-bootstrap";
import ModalUpdate from "./ModalUpdate";
import _, { debounce } from "lodash";
import ModalConfirm from "./ModalConfirm";
import "../TableUser.css";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { type } from "@testing-library/user-event/dist/type";
import { toast } from "react-toastify";

const TableUser = () => {
  const [listUsers, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [dataUserDelete, setDataUserDelete] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [sortBy, setSortBy] = useState("desc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUsers]);
  };

  const handleUpdateTableFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUser(cloneListUsers);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setTotalPage(res.total_pages);
      setTotalUser(res.total);
      setListUser(res.data);
    }
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserFormModel = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

    setListUser(cloneListUsers);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUser(cloneListUsers);
  };
  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log(">>>debounce:", term);
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUser(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 300);

  const getDataExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "Email", "Fisrt Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
    // console.log(event, done);
  };
  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        // console.log("sjdhsh", file);
        toast.error("Định dạng file không hợp lệ! \nHãy định dáng file .CSV");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("wrong format Header CSV file!");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = [];
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                toast.success("Thêm mới thành công");
                setListUser(result);
              }
            } else {
              toast.error("Wrong format CSV filel");
            }
          } else toast.error("Not found data on CSV filel");
        },
      });
    }
  };

  return (
    <>
      <Container>
        <div className="my-3 d-flex justify-content-between">
          <span>List User:</span>
          <div className="group-btns">
            <label className="btn btn-warning" htmlFor="test">
              <i className="fa-solid fa-file-import"></i> Import
            </label>
            <input
              type="file"
              id="test"
              hidden
              onChange={(event) => handleImportCSV(event)}
            />

            <CSVLink
              data={dataExport}
              filename={"my-file-export.csv"}
              className="btn btn-primary"
              // target="_blank"
              asyncOnClick={true}
              onClick={getDataExport}
            >
              <i className="fa-solid fa-file-export"></i> Export
            </CSVLink>

            <Button
              onClick={() => {
                setIsShowModalAddNew(true);
              }}
              className="btn btn-success"
            >
              <i className="fa-solid fa-circle-plus"></i> Add new
            </Button>
          </div>
        </div>
        <div className="col-4 my-3">
          <input
            type="text"
            className="form-control "
            placeholder="search for email..."
            // value={keyword}
            onChange={(event) => handleSearch(event)}
          />
        </div>
        <Table striped bordered hover size="sm mt-3">
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      onClick={() => handleSort("asc", "id")}
                      className="fa-solid fa-arrow-down-long"
                    ></i>
                    <i
                      onClick={() => handleSort("desc", "id")}
                      className="fa-solid fa-arrow-up-long"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      onClick={() => handleSort("asc", "first_name")}
                      className="fa-solid fa-arrow-down-long"
                    ></i>
                    <i
                      onClick={() => handleSort("desc", "first_name")}
                      className="fa-solid fa-arrow-up-long"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={`user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditUser(item)}
                      >
                        edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <ReactPaginate
          //   className="m-auto"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={5}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
        />
        <ModalUpdate
          show={isShowModalEdit}
          dataUserEdit={dataUserEdit}
          handleClose={handleClose}
          handleUpdateTableFromModal={handleUpdateTableFromModal}
        />
        <ModalConfirm
          show={isShowModalDelete}
          handleClose={handleClose}
          dataUserDelete={dataUserDelete}
          handleDeleteUserFormModel={handleDeleteUserFormModel}
        />
      </Container>
    </>
  );
};

export default TableUser;
