import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form11 = ({ open, setOpen, data, getFormData }) => {
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
        handleFormData('Search_Conducted_Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/toxsection11data`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/toxsection11data/${formData?.row_id}`, formData)
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
                <p>Search Conducted By:</p>
                <Select options={[
                    { value: 'Internal', label: 'Internal' },
                    { value: 'External', label: 'External' },
                ]} onChange={(e) => handleFormData('Search_Conducted_By', e)} value={formData?.Search_Conducted_By} className="mb-3 w-100" placeholder='Search Conducted By' />
            </div>
            <div>
                <p>Evaluator:</p>
                <Input placeholder='Evaluator' className='mb-3' value={formData?.Evaluator} onChange={(e) => handleFormData('Evaluator', e.target.value)} />
            </div>
            <div>
                <p>Search Conducted Date:</p>
                <DatePicker className='w-100' onChange={handleDate} />
            </div>
            <div>
                <p>Search String:</p>
                <Input placeholder='Search String' className='mb-3' value={formData?.Search_String} onChange={(e) => handleFormData('Search_String', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form11