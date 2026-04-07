import { useState, useEffect, useCallback } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function EmployeeForm({ empId, title }) {
  const [emp, setEmp] = useState({
    empName: "",
    empEmail: "",
    city: "",
    age: "",
  });

  const navigate = useNavigate();

  // ✅ FIX: useCallback added
  const loadEmployee = useCallback(async () => {
    try {
      const res = await getEmployeeById(empId);
      setEmp(res.data);
    } catch (error) {
      console.error("Error loading employee:", error);
    }
  }, [empId]);

  // ✅ FIX: dependency updated
  useEffect(() => {
    if (empId) {
      loadEmployee();
    }
  }, [empId, loadEmployee]);

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  // ✅ FIX: added try-catch
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (empId) {
        await updateEmployee(empId, emp);
      } else {
        await createEmployee(emp);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header bg-dark text-white text-center">
            <h4>{title}</h4>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="empName"
                  className="form-control"
                  value={emp.empName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="empEmail"
                  className="form-control"
                  value={emp.empEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={emp.city}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={emp.age}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-success">
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;