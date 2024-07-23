import { useFormik } from "formik"
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword= function(){
    const url=new URL(window.location.href)
    const token= url.searchParams.get('token')
    const formik=useFormik({
        initialValues:{
            newPassword:'',
            confirmPassword:'',
            newPassword2:'',
        },
        onSubmit:async(values,{resetForm})=>{
            try{
                await fetch(`https://e-commerce-furebo-32-bn-1.onrender.com/api/users/resetpassword?token=${token}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                         newPassword:`${values.newPassword}` 
                    })
                }).then(res=>{
                    res.json().then(data=>{
                        if(res.status===200){
                            toast.success(data.message);
                            resetForm();
                        }
                        else{
                            toast.error(data.message);
                            resetForm()
                        }
                    })
                })
            }
            catch(error){
                toast.error('Network Error')
            }
        },
        validate: values=>{
            let errors={} as any
            if(!values.newPassword){
                errors.newPassword='Please enter your new password'
            }
            else if(!values.confirmPassword){
                errors.confirmPassword='Please confirm password'
            }
            else if(values.confirmPassword!==values.newPassword){
                errors.newPassword2='Password don\'t match'
            }
            return errors
        }
    })

    return <div className="flex flex-col item-center justify-center w-full min-h-screen">
        <div className="w-full max-w-md mx-auto p-6 bg-primary-100 border rounded-[10px] flex flex-col gap-[20px]">
        <div className="flex w-[auto] gap-[50px]">
            <img className="h-20 mr-4" src="/images/logo.png"/>
            <h3 className="font-bold h-[100%] flex items-center">
                Reset password
            </h3>
        </div>
        <form action="" onSubmit={formik.handleSubmit} className="flex flex-col gap-[15px]">
            <div className="flex flex-col">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} className="rounded-[5px] border border-1-black h-[50px] pl-5" />
            </div>
            {formik.errors.newPassword ? <div className="text-red-500">{formik.errors.newPassword}</div> : null}
            <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} className="rounded-[5px] border border-1-black h-[50px] pl-5"/>
            </div>
            {formik.errors.confirmPassword ? <div className="text-red-500">{formik.errors.confirmPassword}</div> : null}
            {formik.errors.newPassword2? <div className="text-red-500">{formik.errors.newPassword2}</div> : null}

            <button type="submit" className="bg-[#5A7BFA] rounded-[5px] h-[50px] hover:bg-blue-600 text-[white]">Reset Password</button>
        </form>
        <ToastContainer/>
        </div>
    </div>
}