import React, { useEffect, useState } from 'react';
// material
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableHead,
  Table,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
// components
import EmployeeForm from '../components/EmployeeForm';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import Popup from '../components/Popup';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  createEmployee,
  deleteEmployee,
  employeeSelector,
  fetchEmployees,
  updateEmployee,
} from '../redux/reducers/employeeSlice';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '75%',
  },
}));

const headCells = [
  { id: 'empId', label: 'Employee Id' },
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'address', label: 'Address' },
  { id: 'city', label: 'City' },
  { id: 'actions', label: 'Actions' },
];

export default function Employees() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employees } = useSelector(employeeSelector);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const addOrEdit = (employee, resetForm) => {
    if (employee._id == null) {
      dispatch(createEmployee(employee));
      setNotify({
        isOpen: true,
        message: 'Data Added Successfully',
        type: 'success',
      });
    } else {
      dispatch(updateEmployee(employee));
      setNotify({
        isOpen: true,
        message: 'Data Updated Successfully',
        type: 'success',
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog(false);
    dispatch(deleteEmployee(id));
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(fetchEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <PageHeader
        title="Employee Management"
        subTitle="MERN assignment developed by Raghvendra Singh"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      >
        <Button
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
        >
          Add New Employee
        </Button>
      </PageHeader>
      <Paper className={classes.pageContent}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.empId}</TableCell>
                <TableCell>
                  {item.firstname} {item.lastname}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure want to delete this record?',
                        subTitle: "You can't undo this action",
                        onConfirm: () => {
                          onDelete(item._id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
