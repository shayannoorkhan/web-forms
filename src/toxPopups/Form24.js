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
                <p>Date:</p>
                <DatePicker onChange={handleDate} className="w-100 mb-3" />
            </div>
            <div>
                <p>Name of Reference Document:</p>
                <Input placeholder='Name of Reference Document' className='mb-3' value={formData?.Name_of_Reference_Document} onChange={(e) => handleFormData('Name_of_Reference_Document', e.target.value)} />
            </div>
            <div>
                <p>Reference Document Table of Content Reference:</p>
                <Input placeholder='Reference Document Table of Content Reference' className='mb-3' value={formData?.Reference_Document_Table_of_Content_Reference} onChange={(e) => handleFormData('Reference_Document_Table_of_Content_Reference', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' type='number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
            <div>
                <p>Comments:</p>
                <Input placeholder='Comments' className='mb-3' value={formData?.Comments} onChange={(e) => handleFormData('Comments', e.target.value)} />
            </div>
            <div>
                <p>Reference TOX Review:</p>
                <Input placeholder='Reference TOX Review' className='mb-3' value={formData?.Reference_TOX_Review} onChange={(e) => handleFormData('Reference_TOX_Review', e.target.value)} />
            </div>
            <div>
                <p>Database Completion Comments:</p>
                <Input placeholder='Database Completion Comments' className='mb-3' value={formData?.Database_Completion_Comments} onChange={(e) => handleFormData('Database_Completion_Comments', e.target.value)} />
            </div>
            <div>
                <p>Tier 1 Studies Comment:</p>
                <Input placeholder='Tier 1 Studies Comment' className='mb-3' value={formData?.Tier_1_Studies_Comment} onChange={(e) => handleFormData('Tier_1_Studies_Comment', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form24