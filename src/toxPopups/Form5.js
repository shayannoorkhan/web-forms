import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, Button, message, DatePicker, Checkbox } from 'antd'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form5 = ({ open, setOpen, data, getFormData }) => {
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
        axios.post(`https://aldprototype.ca:3000/api/toxsection5data`, obj)
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
        axios.put(`https://aldprototype.ca:3000/api/toxsection5data/${formData?.row_id}`, formData)
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
                <p>Category:</p>
                <Select options={[
                    { value: 'Greater Toxicity than the parent compound', label: 'Greater Toxicity than the parent compound' },
                    { value: 'Common to other TGAI and/or common mechanism group(s)', label: 'Common to other TGAI and/or common mechanism group(s)' },
                    { value: 'Different spectrum of toxicity than the parent compound', label: 'Different spectrum of toxicity than the parent compound' },
                    { value: 'Other', label: 'Other' },
                ]} onChange={(e) => handleFormData('Category', e)} value={formData?.Category} className="mb-3 w-100" placeholder='Category' />
            </div>
            <div>
                <p>PMRA Number of the Record of Residue Definition Decision:</p>
                <Input placeholder='PMRA Number of the Record of Residue Definition Decision' className='mb-3' value={formData?.PMRA_Number_of_the_Record_of_Residue_Definition_Decision} onChange={(e) => handleFormData('PMRA_Number_of_the_Record_of_Residue_Definition_Decision', e.target.value)} />
            </div>
            <div>
                <p>List of Metabolites:</p>
                <Input placeholder='List of Metabolites' className='mb-3' value={formData?.List_of_Metabolites} onChange={(e) => handleFormData('List_of_Metabolites', e.target.value)} />
            </div>
            <div>
                <p>PMRA Number:</p>
                <Input placeholder='PMRA Number' className='mb-3' value={formData?.PMRA_Number} onChange={(e) => handleFormData('PMRA_Number', e.target.value)} />
            </div>
        </Modal>
    )
}

export default Form5