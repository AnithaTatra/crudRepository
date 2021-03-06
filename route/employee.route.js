const router = require('express').Router();
const req = require('express/lib/request');
const employeeSchema = require('../model/employee.model');


//create operation on employee data
router.post('/addNewEmpData',async(req,res)=>{
    try{
        if(req.body.employeeName.search(/^[A-Za-z]+$/)){
            return res.status(400).json({'status':"Failed",'message':"Please enter the  valid EmployeeName "})
        } 
        else if(req.body.employeeName=="null" || req.body.employeeName==null){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeeName "})
        }else if(req.body.employeeId=="null" || req.body.employeeId==0){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeeId"})
        }else if(req.body.employeeAddress=="null" || req.body.employeeAddress==""){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeeAddress"})
        }else if(req.body.employeePanNumber=="null"|| req.body.employeePanNumber==""){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeePannumber"})
        }else if(req.body.employeeAadharNumber.search(/^[0-9]*(?:\.\d{1,2})?$/)){
            return res.status(400).json({'status': "Failed",'message':"Please enter the valid AadharNumber"})
        }else if(req.body.employeeAadharNumber=="null"|| req.body.employeeAadharNumber=="" ){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeeAadharnumber"})
        }else if(req.body.employeeState=="null" || req.body.employeeState==""){
            return res.status(400).json({'status':"Failed",'message':"Please enter the EmployeeState"})
        }
       else{
        let empData = req.body
        console.log(empData);
        const empInfo = new employeeSchema(empData);
        const result = await empInfo.save();
        return res.status(200).json({'status':"success",'message':"Employee Data successfully created","result":result})
       }
    }catch(error){
        console.log(error.message)
        return res.status(400).json({'status':"Failure",'message':error.message})
    }
});


//get all employee Details
router.get('/getAllEmployeeDetails',async(req,res)=>{
    try{
        const employeeDetails = await employeeSchema.find().exec();
        if(employeeDetails.length>0){
            return res.status(200).json({'status':"success",'message':"Employee Details Fetched successfully",'result':employeeDetails});
        }else{
            return res.status(400).json({'status':"Failure",'message':"Employee Details not Available"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(400).json({'status':"Failed",'message':error.message})
    }
});


//get individual employee Details
router.get('/getindivEmpDetail' ,async(req,res)=>{
    try{
        const employeeDetails = await employeeSchema.findOne({"uuid":req.query.employee_uuid}).exec();
        
        if(employeeDetails){
            return res.status(200).json({'status':"success",'message':"Single Employee Details Fetched successfully",'result':employeeDetails});
        }else{
            return res.status(400).json({'status':"Failure",'message':"No Employee Detail fetched"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(400).json({'status':"Failed",'message':error.message})
    }
});

//update operation on employee Data 
router.put('/updateEmployeeData',async(req,res)=>{
    try{
        //let testCondition = {uuid:"EMP-32A46D2D1E"}
        //let updateDetails = {$set:{employeeState:"M.p"}};
        let testCondition = {uuid: req.body.uuid}
        let updateDetails = req.body.updateDetails;
        let choice = {new:true};
        const updateData = await employeeSchema.findOneAndUpdate(testCondition,updateDetails,choice).exec();
        return res.status(200).json({'status':"success",'message':"Employee Data updated successfully",'updateData':updateData});
    }catch(error){
        console.log(error.message)
        return res.status(400).json({'status':"Failure",'message':error.message});
    }   
});


// delete operation on employee Data
router.delete('/deleteEmployeeData/:emp_uuid',async(req,res)=>{
    try{
        console.log(req.params.emp_uuid)
        await employeeSchema.findOneAndDelete({uuid:req.params.emp_uuid}).exec();
        return res.status(200).json({'status':'success','message':"Employee Data Deleted successfully"});
    }catch(error){
        console.log(error.message)
        return res.status(400).json({'status':"failure",'message':error.message})
    }
});
 
module.exports = router;



















module.exports = router;