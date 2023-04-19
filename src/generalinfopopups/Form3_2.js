import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form3_2 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param?.submissionNumber,
        'Subsection_Name': "Completed (i-Done) or Open Re-evaluation"
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setFormData(data)
        }
    }, [data])

    function handleFormData(name, value) {
        setFormData({ ...formData, [name]: value })
    }

    function handleLastUpdateDate(date, dateString) {
        handleFormData('Last_Status_Update_Date:', dateString)
    }

    function handlesmc2Date(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_PRVD', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber,
            'Subsection_Name': "Completed (i-Done) or Open Re-evaluation"
        }
        setLoading(true)
        axios.post(`${baseUrl}geninfosection3data`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}geninfosection3data/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title='Add New Record' footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.row_id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div className='mb-3'>
                <p>Re-Evaluation Status:</p>
                <Input placeholder='Re-Evaluation Status' className='mb-3' value={formData?.Re_Evaluation_Status} onChange={(e) => handleFormData('Re_Evaluation_Status', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Last Status Update Date:</p>
                <DatePicker onChange={handleLastUpdateDate} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>Re-Evaluation Submission Number:</p>
                <Input placeholder='Re-Evaluation Submission Number' className='mb-3' value={formData?.Re_Evaluation_Submission_Number} onChange={(e) => handleFormData('Re_Evaluation_Submission_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Re-Evaluation Submission Category:</p>
                <Input placeholder='Re-Evaluation Submission Category' className='mb-3' value={formData?.Re_Evaluation_Submission_Category} onChange={(e) => handleFormData('Re_Evaluation_Submission_Category', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Re-Evaluation Submission Type:</p>
                <Input placeholder='Re-Evaluation Submission Type' className='mb-3' value={formData?.Re_Evaluation_Submission_Type} onChange={(e) => handleFormData('Re_Evaluation_Submission_Type', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Scoping Document PMRA Number:</p>
                <Input placeholder='Scoping Document PMRA Number' className='mb-3' value={formData?.Scoping_Document_PMRA_Number} onChange={(e) => handleFormData('Scoping_Document_PMRA_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Category:</p>
                <Input placeholder='Category' className='mb-3' value={formData?.Category} onChange={(e) => handleFormData('Category', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Associated Publication PRVD:</p>
                <Input placeholder='Associated Publication PRVD' className='mb-3' value={formData?.Associated_Publication_PRVD} onChange={(e) => handleFormData('Associated_Publication_PRVD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number PRVD:</p>
                <Input placeholder='PMRA Number PRVD' className='mb-3' value={formData?.PMRA_Number_PRVD} onChange={(e) => handleFormData('PMRA_Number_PRVD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date of SMC2 BN for RDD:</p>
                <DatePicker onChange={handlesmc2Date} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>PMRA Number SMC2 PRVD:</p>
                <Input placeholder='PMRA Number SMC2 PRVD' className='mb-3' value={formData?.PMRA_Number_SMC2_PRVD} onChange={(e) => handleFormData('PMRA_Number_SMC2_PRVD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Associated Publication RVD:</p>
                <Input placeholder='Associated Publication RVD' className='mb-3' value={formData?.Associated_Publication_PRVD} onChange={(e) => handleFormData('Associated_Publication_PRVD', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3_2