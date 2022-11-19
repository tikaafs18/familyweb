import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../helper";

const AddData = () => {
    const navigate = useNavigate();
    const [dataprovince, setDataProvince] = useState([]);
    const [datacity, setDataCity] = useState([]);
    const [datadistrict, setDataDistrict] = useState([]);
    const [datapostalcode, setDataPostalcode] = useState([]);

    const [name, setName] = useState('');
    const [birth_date, setBirth_Date] = useState('');
    const [gender, setGender] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [full_address, setFull_Address] = useState('');
    const [idprovince, setIdprovince] = useState('');
    const [idcity, setIdcity] = useState('');
    const [iddistrict, setIddistrict] = useState('');
    const [idpostalcode, setIdpostalcode] = useState('');
    const [mom, setMom] = useState('');
    const [dad, setDad] = useState('');
    const [spouse, setSpouse] = useState(null);
    const [child1, setChild1] = useState(null);
    const [child2, setChild2] = useState(null);

    console.log(gender)

    const getProvince = () => {
        axios.get(API_URL + '/address/province')
            .then((res) => {
                setDataProvince(res.data)
            })
            .catch((error) => {
                console.log('getuser error :', error)
            })
    }

    const getCity = () => {
        axios.get(API_URL + `/address/city?idprovince=${idprovince ? idprovince : ''}`)
            .then((res) => {
                setDataCity(res.data)
            })
            .catch((error) => {
                console.log('getuser error :', error)
            })
    }

    const getDistrict = () => {
        axios.get(API_URL + `/address/district?idcity=${idcity ? idcity : ''}`)
            .then((res) => {
                setDataDistrict(res.data)
            })
            .catch((error) => {
                console.log('getuser error :', error)
            })
    }

    const getPostalcode = () => {
        axios.get(API_URL + `/address/postalcode?iddistrict=${iddistrict ? iddistrict : ''}`)
            .then((res) => {
                setDataPostalcode(res.data)
            })
            .catch((error) => {
                console.log('getuser error :', error)
            })
    }

    useEffect(() => {
        getProvince();
        getCity();
        getDistrict();
        getPostalcode();
    }, [idprovince, idcity, iddistrict])

    const printProvince = () => {
        return dataprovince.map(val => {
            return <option key={val.idprovince} value={val.idprovince}>{val.province}</option>
        })
    }

    const printCity = () => {
        return datacity.map(val => {
            return <option key={val.idcity} value={val.idcity} onClick={() => setIdcity(val.idcity)}>{val.city}</option>
        })
    }

    const printDistrict = () => {
        return datadistrict.map(val => {
            return <option key={val.iddistrict} value={val.iddistrict} onClick={() => setIddistrict(val.iddistrict)}>{val.district}</option>
        })
    }

    const printPostalcode = () => {
        return datapostalcode.map(val => {
            return <option key={val.idpostalcode} value={val.idpostalcode} onClick={() => setIdpostalcode(val.idpostalcode)}>{val.postalcode}</option>
        })
    }

    const onSubmit = () => {
        let province = dataprovince.find(val => val.idprovince == idprovince);
        let city = datacity.find(val => val.idcity == idcity);
        let district = datadistrict.find(val => val.iddistrict == iddistrict);
        let postalcode = datapostalcode.find(val => val.idpostalcode == idpostalcode);

        axios.post(API_URL + '/user/add',
            {
                name,
                birth_date,
                gender,
                full_address,
                phone_number,
                idprovince,
                province: province.province,
                idcity,
                city: city.city,
                iddistrict,
                district: district.district,
                idpostalcode,
                postalcode: postalcode.postalcode,
                spouse,
                child1,
                mom,
                dad
            }
        )
            .then((res) => {
                if (res.data.success) {
                    alert('Add data success');
                    setName('');
                    setBirth_Date('');
                    setPhone_number('');
                    setFull_Address('');
                    setIdprovince('');
                    setIdcity('');
                    setIddistrict('');
                    setIdpostalcode('');
                    setMom('');
                    setDad('');
                    navigate('/',{replace:true});
                } else {
                    alert('Add data fail, data already existed')
                }
            })
            .catch((error) => {
                console.log('onsubmit error :', error)
            })
    }

    return <div className="">
        {/* <div className="left"> */}
        <form>
            <div className="input-container name">
                <label htmlFor="fname">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="fname" placeholder="Full name" type="text" />
            </div>

            <div className="input-container bdate">
                <label htmlFor="bdate">Birth Date</label>
                <input value={birth_date} onChange={(e) => setBirth_Date(e.target.value)} id="bdate" type="date" />
            </div>

            <div className="input-container gender">
                <label>Gender</label>
                <div className="radio">
                    <input onChange={(e)=>setGender(e.target.value)} type="radio" id="men" name="gender" value="Men" />
                    <label for="men">Men</label>
                    <input onChange={(e)=>setGender(e.target.value)} type="radio" id="women" name="gender" value="Women" />
                    <label for="women">Women</label>
                </div>
            </div>

            <div className="input-container phone">
                <label htmlFor="phone">Phone Number</label>
                <input value={phone_number} onChange={(e) => setPhone_number(e.target.value)} id="phone" placeholder="+62..." type="number" />
            </div>

            <div className="input-container address">
                <label htmlFor="street">Address</label>
                <input value={full_address} onChange={(e) => setFull_Address(e.target.value)} id="street" type="text" placeholder="Full address" />
                <div className="detailaddress">
                    <div className="detail-left">
                        <label htmlFor="province" className="item">Province</label>
                        <select onChange={(e) => setIdprovince(e.target.value)} id="province" name="province" form="provinceform">
                            <option defaultValue='Choose province'>Choose province</option>
                            {printProvince()}
                        </select>
                        <label htmlFor="city" className="item">City</label>
                        <select onChange={(e) => setIdcity(e.target.value)} disabled={idprovince ? false : true} id="city" name="city" form="cityform">
                            <option defaultValue='Choose city'>Choose city</option>
                            {printCity()}
                        </select>
                    </div>
                    <div className="detail-right">
                        <label htmlFor="district" className="item">District</label>
                        <select onChange={(e) => setIddistrict(e.target.value)} disabled={idcity ? false : true} id="district" name="district" form="districtform">
                            <option defaultValue='Choose district'>Choose district</option>
                            {printDistrict()}
                        </select>
                        <label htmlFor="postalcode" className="item">Postal Code</label>
                        <select onChange={(e) => setIdpostalcode(e.target.value)} disabled={iddistrict ? false : true} id="postalcode" name="postalcode" form="postalcodeform">
                            <option defaultValue='Choose postal code'>Choose postal code</option>
                            {printPostalcode()}
                        </select>
                    </div>
                </div>
            </div>

            <div className="input-container mom">
                <label htmlFor="mother">Mother Name</label>
                <input value={mom} onChange={(e) => setMom(e.target.value)} id="mother" type="text" placeholder="Input your mother full name" />
            </div>
            <div className="input-container father">
                <label htmlFor="father">Father Name</label>
                <input value={dad} onChange={(e) => setDad(e.target.value)} id="father" placeholder="Input your father full name" type="text" />
            </div>
            <button onClick={onSubmit} type="button" className="btnsubmit">Submit</button>
        </form>
        {/* </div> */}
        {/* <div className="right">
            <form>
                <div className="input-container mom">
                    <label htmlFor="mother">Mother Name</label>
                    <input value={mom} onChange={(e) => setMom(e.target.value)} id="mother" type="text" placeholder="Input your mother full name" />
                </div>
                <div className="input-container father">
                    <label htmlFor="father">Father Name</label>
                    <input value={dad} onChange={(e) => setDad(e.target.value)} id="father" placeholder="Input your father full name" type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="spouse">Spouse Name</label>
                    <input value={spouse} onChange={(e) => setSpouse(e.target.value)} id="spouse" type="text" placeholder="Input your spouse name" />
                </div>
                <div className="input-container">
                    <label htmlFor="child1">Children Name 1</label>
                    <input value={child1} onChange={(e) => setChild1(e.target.value)} id="child1" type="text" placeholder="Input your children name" />
                </div>
                <div className="input-container">
                    <label htmlFor="child2">Children Name 2</label>
                    <input value={child2} onChange={(e) => setChild2(e.target.value)} id="child2" type="text" placeholder="Input your children name" />
                </div>
                <button type="button" className="btnchild">Add another children name</button>
            </form>
        </div> */}
    </div>
}

export default AddData;