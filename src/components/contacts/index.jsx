import { useState } from "react";
import ContactsInfo from "../../helpers/ContactInfo";
import useTranslate from "../../hook/useTranslate";



function Contacts(props) {

    const [values, setValues] = useState({
        mail: '',
        name: '',
        tel: '',
        msg: ''

    })


    const {getTranslateBlock } = useTranslate()
    

    const translate = getTranslateBlock('contacts');
    


    return (
        <div className="contacts forContainer">
            <div className="container">
                {/* <h1>Контакти</h1> */}
                <div className="left">
                    <h2>{translate.contactHead}</h2>
                    <ul>
                        <li><a href={`tel:${ContactsInfo.phone}`}>{ContactsInfo.prettyPhone}</a></li>
                        <li><a href={`tel:${ContactsInfo.phone2}`}>{ContactsInfo.prettyPhone2}</a></li>
                        <li><a href={`mailto:${ContactsInfo.mail}`}>{ContactsInfo.mail}</a></li>
                        <li>{ContactsInfo.address}</li>
                    </ul>
                </div>
                <div className="right">
                    <h2>{translate.cbHead}</h2>
                    <input type="text" name='name' placeholder={translate.inputs.name} value={values.name} onChange={({target})=>{ handleChange(target)}}/>
                    <input type="text" name='mail' placeholder={translate.inputs.mail} value={values.mail} onChange={({target})=>{ handleChange(target)}}/>
                    <input type="text" name='tel' placeholder={translate.inputs.tel} value={values.tel} onChange={({target})=>{ handleChange(target)}}/>
                    <textarea name="msg" id="msg" placeholder={translate.inputs.msg} value={values.msg} onChange={({target})=>{ handleChange(target)}}/>
                    <div className="btns">
                        <div className="btn" onClick={()=>{submit()}}>{translate.inputs.btn}</div>
                    </div>
                </div>
            </div>
        </div>
    )

    function submit() {
        console.log(values);
        alert('Sended')
        setValues({
            mail: '',
            name: '',
            tel: '',
            msg: ''
        })
    }

    function handleChange(target) {
        const name = target.name;
        setValues((prev)=>{
            return {
                ...prev,
                [name]: target.value 
            }
        })
    }
}

export default Contacts;