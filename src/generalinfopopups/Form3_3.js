import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form3_3 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param?.submissionNumber,
        'Subsection_Name': "Completed (i-Done) or Open Special Review"
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
        handleFormData('Special_Review_Last_Status_Update_Date:', dateString)
    }

    function handlesmc2Date(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_PRVD', dateString)
    }

    function handlesmc2DateSRD(date, dateString) {
        handleFormData('Date_of_SMC2_BN_for_SRD', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber,
            'Subsection_Name': "Completed (i-Done) or Open Special Review"
        }
        setLoading(true)
        axios.post(`${baseUrl}geninfosection3data`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}geninfosection3data/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title={formData?.row_id ? 'Edit Record' : 'Add New Record'} footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.row_id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div className='mb-3'>
                <p>Special Review Status Status:</p>
                <Input placeholder='Special Review Status Status' className='mb-3' value={formData?.Special_Review_Status_Status} onChange={(e) => handleFormData('Special_Review_Status_Status', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Special Review Last Status Update Date:</p>
                <DatePicker onChange={handleLastUpdateDate} placeholder='Special Review Last Status Update Date:' className="w-100" />
            </div>
            <div className='mb-3'>
                <p>Special Review Submission Number:</p>
                <Input placeholder='Special Review Submission Number' className='mb-3' value={formData?.Special_Review_Submission_Number} onChange={(e) => handleFormData('Special_Review_Submission_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Special Review Submission Category:</p>
                <Input placeholder='Special Review Submission Category' className='mb-3' value={formData?.Special_Review_Submission_Category} onChange={(e) => handleFormData('Special_Review_Submission_Category', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Special Review Submission Type:</p>
                <Input placeholder='Special Review Submission Type' className='mb-3' value={formData?.Special_Review_Submission_Type} onChange={(e) => handleFormData('Special_Review_Submission_Type', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Preliminary Analysis PMRA Document Number:</p>
                <Input placeholder='Preliminary Analysis PMRA Document Number' className='mb-3' value={formData?.Preliminary_Analysis_PMRA_Document_Number} onChange={(e) => handleFormData('Preliminary_Analysis_PMRA_Document_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Trigger:</p>
                <Input placeholder='Trigger' className='mb-3' value={formData?.Trigger} onChange={(e) => handleFormData('Trigger', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Associated Publication PSR:</p>
                <Input placeholder='Associated Publication PSR' className='mb-3' value={formData?.Associated_Publication_PSR} onChange={(e) => handleFormData('Associated_Publication_PSR', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number PSR:</p>
                <Input placeholder='PMRA Number PSR' className='mb-3' value={formData?.PMRA_Number_PSR} onChange={(e) => handleFormData('PMRA_Number_PSR', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date of SMC2 BN for PSR:</p>
                <DatePicker onChange={handlesmc2Date} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>PMRA Number SMC2 PSR:</p>
                <Input placeholder='PMRA Number SMC2 PSR' className='mb-3' value={formData?.PMRA_Number_SMC2_PSR} onChange={(e) => handleFormData('PMRA_Number_SMC2_PSR', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Associated Publication SRD:</p>
                <Input placeholder='Associated Publication SRD' className='mb-3' value={formData?.Associated_Publication_SRD} onChange={(e) => handleFormData('Associated_Publication_SRD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number SRD:</p>
                <Input placeholder='PMRA Number SRD' className='mb-3' value={formData?.PMRA_Number_SRD} onChange={(e) => handleFormData('PMRA_Number_SRD', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Date of SMC2 BN for SRD:</p>
                <DatePicker onChange={handlesmc2DateSRD} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>PMRA Number SMC2 SRD:</p>
                <Input placeholder='PMRA Number SMC2 SRD' className='mb-3' value={formData?.PMRA_Number_SMC2_SRD} onChange={(e) => handleFormData('PMRA_Number_SMC2_SRD', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form3_3