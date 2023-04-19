import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form2 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param.submissionNumber
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

    function handleDate(date, dateString) {
        handleFormData('Actual_End_Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`${baseUrl}toxsection21summarytable`, obj)
            .then((resp) => {
                message.success('Record Added')
                setLoading(false)
                getFormData()
                setOpen(false)
                formData({})
            })
    }

    function edit() {
        setLoading(true)
        axios.put(`${baseUrl}toxsection21summarytable/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                setLoading(false)
                getFormData()
                setOpen(false)
                formData({})
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
            <div>
                <p>CAS Number:</p>
                <Input placeholder='CAS Number' className='mb-3' value={formData?.CAS_Number} onChange={(e) => handleFormData('CAS_Number', e.target.value)} />
            </div>
            <div>
                <p>Exposure Scenario:</p>
                <Select options={[
                    { value: 'Acute Dietary', label: 'Acute Dietary' },
                    { value: 'Repeated Dietary', label: 'Repeated Dietary' },
                    { value: 'Occupational', label: 'Occupational' },
                    { value: 'Residential', label: 'Residential' },
                    { value: 'Aggeregate', label: 'Aggeregate' },
                    { value: 'Cancer', label: 'Cancer' }
                ]} onChange={(e) => handleFormData('Exposure_Scenario', e)} value={formData?.Exposure_Scenario} className="mb-3 w-100" placeholder='Exposure Scenario' />
            </div>
            <div>
                <p>Study:</p>
                <Input placeholder='Study' className='mb-3' value={formData?.Study} onChange={(e) => handleFormData('Study', e.target.value)} />
            </div>
            <div>
                <p>Point of Departure and End Point:</p>
                <Input placeholder='Point of Departure and End Point' className='mb-3' value={formData?.Point_of_Departure_and_End_Point} onChange={(e) => handleFormData('Point_of_Departure_and_End_Point', e.target.value)} />
            </div>
            <div>
                <p>CAF or Target MOE:</p>
                <Input placeholder='CAF or Target MOE' type='number' className='mb-3' value={formData?.CAF_or_Target_MOE} onChange={(e) => handleFormData('CAF_or_Target_MOE', e.target.value)} />
            </div>
            <div>
                <p>Reference Document:</p>
                <Input placeholder='Reference Document' className='mb-3' value={formData?.Reference_Document} onChange={(e) => handleFormData('Reference_Document', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>ARfD Value:</p>
                <Input placeholder='ARfD Value' className='mb-3' value={formData?.ARfD_Value} onChange={(e) => handleFormData('ARfD_Value', e.target.value)} />
            </div>
            <div>
                <p>ARfD Unit:</p>
                <Input placeholder='ARfD Unit' className='mb-3' value={formData?.ARfD_Unit} onChange={(e) => handleFormData('ARfD_Unit', e.target.value)} />
            </div>
            <div>
                <p>Actual End Date:</p>
                <DatePicker onChange={handleDate} className="w-100" />
                {/* <Input placeholder='ARfD Unit' className='mb-3' value={formData?.ARfD_Unit} onChange={(e) => handleFormData('ARfD_Unit', e.target.value)} /> */}
            </div>
        </Modal>
    )
}

export default Form2