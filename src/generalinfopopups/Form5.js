import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form5 = ({ open, setOpen, data, getFormData, setData }) => {
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
        axios.post(`${baseUrl}geninfoscienceteamaldstable`, obj)
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
        axios.put(`${baseUrl}geninfoscienceteamaldstable/${formData?.row_id}`, formData)
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
                <p>Tox:</p>
                <Select options={[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' },
                    { value: 'N/A', label: 'N/A' },
                ]} onChange={(e) => handleFormData('TOX', e)} value={formData?.TOX} className="mb-3 w-100" placeholder='Tox' />
            </div>
            <div className='mb-3'>
                <p>Tox Details:</p>
                <Input placeholder='Tox Details' className='mb-3' value={formData?.TOX_Details} onChange={(e) => handleFormData('TOX_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Dietary:</p>
                <Select
                    placeholder='Dietary'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('Dietary', e)} value={formData?.Dietary} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>Dietary Details:</p>
                <Input placeholder='Dietary Details' className='mb-3' value={formData?.Dietary_Details} onChange={(e) => handleFormData('Dietary_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>Occupational:</p>
                <Select
                    placeholder='Occupational'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('Occupational', e)} value={formData?.Occupational} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>Occupational Details:</p>
                <Input placeholder='Occupational Details' className='mb-3' value={formData?.Occupational_Details} onChange={(e) => handleFormData('Occupational_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>IRP:</p>
                <Select
                    placeholder='IRP'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('IRP', e)} value={formData?.IRP} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>IRP Details:</p>
                <Input placeholder='IRP Details' className='mb-3' value={formData?.IRP_Details} onChange={(e) => handleFormData('IRP_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>RRS:</p>
                <Select
                    placeholder='RRS'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('RRS', e)} value={formData?.RRS} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>RRS Details:</p>
                <Input placeholder='RRS Details' className='mb-3' value={formData?.RRS_Details} onChange={(e) => handleFormData('RRS_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>EAD:</p>
                <Select
                    placeholder='EAD'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('EAD', e)} value={formData?.EAD} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>EAD Details:</p>
                <Input placeholder='EAD Details' className='mb-3' value={formData?.EAD_Details} onChange={(e) => handleFormData('EAD_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>EAD WM:</p>
                <Select
                    placeholder='EAD WM'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('EAD_WM', e)} value={formData?.EAD_WM} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>EAD WM Details:</p>
                <Input placeholder='EAD WM Details' className='mb-3' value={formData?.EAD_WM_Details} onChange={(e) => handleFormData('EAD_WM_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>VALUE:</p>
                <Select
                    placeholder='VALUE'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('VALUE', e)} value={formData?.VALUE} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>VALUE Details:</p>
                <Input placeholder='VALUE Details' className='mb-3' value={formData?.VALUE_Details} onChange={(e) => handleFormData('VALUE_Details', e.target.value)} />
            </div>
            <div className='mb-3'>
                <p>CES:</p>
                <Select
                    placeholder='CES'
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'N/A', label: 'N/A' },
                    ]} onChange={(e) => handleFormData('CES', e)} value={formData?.CES} className="mb-3 w-100" />
            </div>
            <div className='mb-3'>
                <p>CES Details:</p>
                <Input placeholder='CES Details' className='mb-3' value={formData?.CES_Details} onChange={(e) => handleFormData('CES_Details', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form5