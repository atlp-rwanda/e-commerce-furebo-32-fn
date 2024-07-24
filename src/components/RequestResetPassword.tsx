import { useFormik } from "formik"
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


export const RequestResetPassword= function(){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const formik=useFormik({
        initialValues:{
            email:'',
        },
        onSubmit:async(values,{resetForm})=>{
            try{
                await fetch('https://e-commerce-furebo-32-bn-1.onrender.com/api/users/requestpasswordreset',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        email:`${values.email}`
                    })
                }).then(res=>{
                    res.json().then(data=>{
                        if(res.status===200){
                            toast.success(data.message)
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
            if(!values.email){
                errors.email='Email is Required'
            }
            else if(!emailRegex.test(values.email)){
                errors.email='Invalid email format'
            }
             
            return errors
        }
    })

    return <div className="flex flex-col item-center justify-center w-full h-[85vh]">
        <div id='requestPassword' className="w-full max-w-md mx-auto p-6 bg-primary-100 border rounded-[10px] flex flex-col gap-[20px]">
            <div className="flex w-[auto] gap-[50px]">
            <img className="h-20 mr-4" src="/images/logo.png"/>
            <h3 className="font-bold h-[100%] flex items-center">
                Email
            </h3>
            </div>
            <form action="" onSubmit={formik.handleSubmit} className="flex flex-col justify-center gap-[15px]">
                <label htmlFor="email">Enter your email to reset password:</label>
                <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} className="rounded-[5px] border border-1-black h-[50px] pl-5" placeholder="user@example.com"/>
                 {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                <button type="submit" className="bg-[#5A7BFA]  rounded-[5px] h-[50px] hover:bg-blue-600 text-[white]">Reset Password</button>
            </form>
        <ToastContainer/>
    </div>
    </div>
}
