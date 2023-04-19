import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form4_7 = ({ open, setOpen, data, getFormData, setData }) => {
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

    function handleDate(date, dateString) {
        handleFormData('Due_date', dateString)
    }

    function addRecord() {
        const obj = {
            ...formData, 'Submission_Number': param?.submissionNumber
        }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/geninfotgaiepunfulfilledconditionstable`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/geninfotgaiepunfulfilledconditionstable/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setLoading(false)
                setOpen(false)
                formData({})
            })
    }

    function onClose() {
        setData({})
        setOpen(false)
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={onClose} title='Add New Record' footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.row_id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div className='mb-3'>
                <p>State:</p>
                <Select options={[
                    { value: 1, label: 'True' },
                    { value: 0, label: 'False' }
                ]} onChange={(e) => handleFormData('State', e)} value={formData?.State} className="mb-3 w-100" placeholder='State' />
            </div>
            <div className='mb-3'>
                <p>TGAI_EP_MA:</p>
                <Input placeholder='TGAI_EP_MA' className='mb-3' value={formData?.TGAI_EP_MA} onChange={(e) => handleFormData('TGAI_EP_MA', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Registration Number:</p>
                <Input placeholder='Registration Number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Due Date:</p>
                <DatePicker onChange={handleDate} className="w-100" />
            </div>
            <div className='mb-3'>
                <p>DACO Number:</p>
                <Input placeholder='DACO Number' className='mb-3' value={formData?.DACO_Number} onChange={(e) => handleFormData('DACO_Number', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Unfulfilled Requirements:</p>
                <Input placeholder='Unfulfilled Requirements' className='mb-3' value={formData?.Unfulfilled_Requirements} onChange={(e) => handleFormData('Unfulfilled_Requirements', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form4_7