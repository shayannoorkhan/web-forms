import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form7 = ({ open, setOpen, data, getFormData }) => {
    const param = useParams()
    const [formData, setFormData] = useState({
        'Submission_Number': param.submissionNumber
    });
    const [subSectionNumber, setSubsectionNumber] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setFormData(data)
            setSubsectionNumber(data?.Subsection_Number)
        }
    }, [data])

    function handleFormData(name, value) {
        setFormData({ ...formData, [name]: value })
    }

    function handleDate(date, dateString) {
        handleFormData('Search_Conducted_Date', dateString)
    }

    function handleSubSec(value) {
        setSubsectionNumber(value)
    }

    function addRecord() {
        const obj = { ...formData, 'Submission_Number': param.submissionNumber }
        setLoading(true)
        axios.post(`https://aldprototype.ca:3000/api/toxsection7data`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/toxsection7data/${formData?.row_id}`, formData)
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
            {
                subSectionNumber === '7.1' ?
                    <>
                        <p>Subsection Number:</p>
                        <Select options={[
                            { value: '7.1', label: '7.1' },
                            { value: '7.2', label: '7.2' },
                        ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                        <div>
                            <p>Document Type:</p>
                            <Input placeholder='Document Type' className='mb-3' value={formData?.Document_Type} onChange={(e) => handleFormData('Document_Type', e.target.value)} />
                        </div>
                        <div>
                            <p>Date:</p>
                            <DatePicker placeholder='Date' className='mb-3 w-100' onChange={(e) => handleDate('Date', e.target.value)} />
                        </div>
                        <div>
                            <p>PMRA Number:</p>
                            <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
                        </div>
                    </>
                    :
                    subSectionNumber === '7.2' ?
                        <>
                            <p>Subsection Number:</p>
                            <Select options={[
                                { value: '7.1', label: '7.1' },
                                { value: '7.2', label: '7.2' },
                            ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                            <div>
                                <p>Date:</p>
                                <DatePicker placeholder='Date' className='mb-3 w-100' onChange={(e) => handleDate('Date', e.target.value)} />
                            </div>
                            <div>
                                <p>Registration Number:</p>
                                <Input placeholder='Registration Number' className='mb-3' value={formData?.Registration_Number} onChange={(e) => handleFormData('Registration_Number', e.target.value)} />
                            </div>
                            <div>
                                <p>PMRA Number:</p>
                                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
                            </div>
                            <div>
                                <p>Comments:</p>
                                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
                            </div>
                        </>
                        :
                        <div>
                            <p>Subsection Number:</p>
                            <Select options={[
                                { value: '7.1', label: '7.1' },
                                { value: '7.2', label: '7.2' },
                            ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                        </div>
            }
        </Modal>
    )
}

export default Form7