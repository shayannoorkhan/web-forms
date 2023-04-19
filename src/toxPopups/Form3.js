import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form24 = ({ open, setOpen, data, getFormData }) => {
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
        handleFormData('Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/toxsections22232434data`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/toxsections22232434data/${formData?.row_id}`, formData)
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
                <p>Cumulative Risk Assessment Required Flag:</p>
                <Select options={[
                    { value: true, label: 'True' },
                    { value: false, label: 'False' }
                ]} onChange={(e) => handleFormData('Cumulative_Risk_Assessment_Required_Flag', e)} value={formData?.Cumulative_Risk_Assessment_Required_Flag} className="mb-3 w-100" placeholder='Cumulative Risk Assessment Required Flag                ' />
            </div>
            <div>
                <p>Cumulative Risk Assessment Required Status:</p>
                <Select options={[
                    { value: 'Initiated', label: 'Initiated' },
                    { value: 'Completed', label: 'Completed' },
                    { value: 'Not Required', label: 'Not Required' },
                ]} onChange={(e) => handleFormData('Cumulative_Risk_Assessment_Status', e)} value={formData?.Cumulative_Risk_Assessment_Status} className="mb-3 w-100" placeholder='Cumulative Risk Assessment Required Status                ' />
            </div>
            <div>
                <p>Date:</p>
                <DatePicker onChange={handleDate} className="w-100 mb-3" />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' type='number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form24