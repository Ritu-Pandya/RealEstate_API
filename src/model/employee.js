import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema(
    {
      employeeName: {
        type: String,
        required: true,
        unique: true,
      },

      employeeEmail: {
        type: String,
        required: true,
        unique: true,
      },
     deparmentID:{
        type:String,
     }
    },
    { timestamps: true }
  );
  const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;