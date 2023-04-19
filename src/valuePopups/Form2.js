import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form2 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'submissionNumber': param.submissionNumber
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
        handleFormData('Reference_PMRA_Document_Numbers_Date', dateString)
    }

    function addRecord() {
        const obj = { ...formData, 'submissionNumber': param.submissionNumber }
        setLoading(true)
        axios.post(`${baseUrl}valuesection2`, obj)
            .then((resp) => {
                message.success('Record Added')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
    }

    function edit() {
        const obj = { ...formData, 'submissionNumber': param.submissionNumber }
        setLoading(true)
        axios.put(`${baseUrl}valuesection2/${formData?.id}`, obj)
            .then((resp) => {
                message.success('Record Updated')
                getFormData()
                setOpen(false)
                formData({})
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                formData({})
                setOpen(false)
                message.error('Error')
            })
    }

    return (
        <Modal centered className='form-30' open={open} style={{ width: '35%' }} onCancel={() => setOpen(false)} title='Add New Record' footer={[
            <>
                <Button loading={loading} disabled={loading} onClick={formData?.id ? edit : addRecord} className="form-button">
                    Save
                </Button>
            </>
        ]}>
            <div>
                <p>Reference_PMRA_Document_Numbers_Date:</p>
                <DatePicker onChange={handleDate} className="w-100 mb-3" />
                {/* <Select options={[
                    { value: 'Parent', label: 'Parent' },
                    { value: 'Derivatives', label: 'Derivatives' }
                ]} onChange={(e) => handleFormData('Subsection_Name', e)} value={formData?.Subsection_Name} className="mb-3 w-100" placeholder='Subsection Name' /> */}
            </div>
            <div>
                <p>Reference PMRA Document Numbers:</p>
                <Input placeholder='Reference PMRA Document Numbers' className='mb-3' value={formData?.Reference_PMRA_Document_Numbers} onChange={(e) => handleFormData('Reference_PMRA_Document_Numbers', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form2