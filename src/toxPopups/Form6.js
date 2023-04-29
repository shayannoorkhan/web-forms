import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helper';

const Form6 = ({ open, setOpen, data, getFormData }) => {
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
        axios.post(`${baseUrl}toxsection6data`, obj)
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
        axios.put(`${baseUrl}toxsection6data/${formData?.row_id}`, formData)
            .then((resp) => {
                message.success('Record Updated')
                setLoading(false)
                getFormData()
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
            {
                subSectionNumber === '6.1' ?
                    <>
                        <p>Subsection Number:</p>
                        <Select options={[
                            { value: '6.1', label: '6.1' },
                            { value: '6.2', label: '6.2' },
                        ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                        <div>
                            <p>Impurity-Contaminant Name:</p>
                            <Input placeholder='Impurity-Contaminant Name' className='mb-3' value={formData?.Impurity_Contaminant_Name} onChange={(e) => handleFormData('Impurity_Contaminant_Name', e.target.value)} />
                        </div>
                        <div>
                            <p>Use-Site-Categories:</p>
                            <Input placeholder='Use-Site-Categories' className='mb-3' value={formData?.Use_Site_Categories} onChange={(e) => handleFormData('Use_Site_Categories', e.target.value)} />
                        </div>
                        <div>
                            <p>Acceptable Level:</p>
                            <Input placeholder='Acceptable Level' className='mb-3' value={formData?.Acceptable_Level} onChange={(e) => handleFormData('Acceptable_Level', e.target.value)} />
                        </div>
                        <div>
                            <p>PMRA Number:</p>
                            <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
                        </div>
                    </>
                    :
                    subSectionNumber === '6.2' ?
                        <>
                            <p>Subsection Number:</p>
                            <Select options={[
                                { value: '6.1', label: '6.1' },
                                { value: '6.2', label: '6.2' },
                            ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                            <div>
                                <p>Impurity-Contaminant Name:</p>
                                <Input placeholder='Impurity-Contaminant Name' className='mb-3' value={formData?.Impurity_Contaminant_Name} onChange={(e) => handleFormData('Impurity_Contaminant_Name', e.target.value)} />
                            </div>
                            <div>
                                <p>Name of Reference Document:</p>
                                <Input placeholder='Name of Reference Document' className='mb-3' value={formData?.Name_of_Reference_Document} onChange={(e) => handleFormData('Name_of_Reference_Document', e.target.value)} />
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
                                { value: '6.1', label: '6.1' },
                                { value: '6.2', label: '6.2' },
                            ]} onChange={(e) => { handleFormData('Subsection_Number', e); handleSubSec(e) }} value={formData?.Subsection_Number} className="mb-3 w-100" placeholder='Subsection Number' />
                        </div>
            }
        </Modal>
    )
}

export default Form6