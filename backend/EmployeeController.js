import firebase from './firebase.js';
import Employee from './EmployeeModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createEmployee = async (req, res, next) => {
    try{
        const data = req.body;
        await addDoc(collection(db, 'employees'),data);
        res.status(200).send('Employee created successfully');
    } catch (error) {
        res.status(400).send(error.messages);
    }
};

export const getEmployees = async (req, res, next) => {
    try{
        const employees = await getDocs(collection(db, 'employees'));
        const employeeArray = [];

        if (employees.empty) {
            res.status(400).send('No employee found');
        } else {
            employees.forEach((doc)=> {
                const employee = new Employee(
                    doc.id,
                    doc.data().name,
                    doc.data().age,
                    doc.data().designation,
                    doc.data().salary,
                );
                employeeArray.push(employee);
            });
            res.status(200).send(employeeArray);
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
};
export const getEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = doc(db, 'employees', id);
        const data = await getDoc(employee);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send('employee not found');
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
};

export const updateEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const employee = doc(db, 'employees' , id);
        await updateDoc(employee,data);
        res.status(200).send('employee update successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
export const deleteEmployee = async ( req, res, next) => {
    try{
        const id = req.params.id;
        await deleteDoc(doc(db,'employees', id));
        res.status(200).send('employee deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};