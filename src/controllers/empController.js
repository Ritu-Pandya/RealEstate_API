import Employee from "../model/employee.js"

export const createEmp = async (req, res, next) => {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(404).send('Not found');
    }
  };

  export const getAllEmpData=async(req,res,next)=>{
    try {
        

      let p = await  Employee.aggregate().lookup({ 
            from: 'Department', 
            localField: 'deparmentID', foreignField: '_id', 
            as: 'DepartmentName'
        });

        return res.status(200).json(p);
      } catch (error) {
        next(error);
      }
}