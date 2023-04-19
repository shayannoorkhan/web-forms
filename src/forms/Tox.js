import React from 'react'
import { Select, Collapse, Input, Button, DatePicker, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd';
import moment from 'moment'
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const { TextArea } = Input;

const Tox = ({ form, index, date }) => {
    const dateFormat = "YYYY-MM-DD";
    return (
        <Collapse accordion className='mb-3'>
            <Panel header={`TOX Form ${index + 1}`} key={index}>
                <div>
                    <div className='mt-3'>
                        <p>Anchor Sub.No.:</p>
                        <Input placeholder='Anchor Sub.No.' value={form['Anchor Submission Number']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>ALD Report to Generate:</p>
                        <Input placeholder='ALD Report to Generate' value={form['ALD Report to Generate']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Evaluator:</p>
                        <Input placeholder='Name of Evaluator' value={form['Evaluator']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>ALD Required:</p>
                        <Input placeholder='ALD Required' value={form['ALD Required']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Program Activity:</p>
                        <Input placeholder='Program Activity' value={form['Program Activity']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Active Name:</p>
                        <Input placeholder='Active Name' value={form['Active Name']} />
                    </div>
                    <div className='mt-3'>
                        <p>Cluster Name:</p>
                        <Input placeholder='Cluster Name' value={form['Cluster Name']} />
                    </div>
                    <div className='mt-3'>
                        <p>Related Submission Numbers:</p>
                        <Input placeholder='Related Submission Numbers' value={form['Related Submission Numbers']} />
                    </div>
                    <div className='mt-3'>
                        <p>Submission Number:</p>
                        <Input placeholder='Submission Number' value={form['Submission Number']} />
                    </div>
                    <div className='mt-3'>
                        <p>Initiation Date:</p>
                        {
                            date &&
                            <DatePicker placeholder='Date of ALD Entry' className='w-100' defaultValue={moment(form['Initiation Date'], dateFormat)} disabled />
                        }
                    </div>
                    <div className='mt-3'>
                        <p>ALD Number:</p>
                        <Input placeholder='ALD Number' value={form['ALD Number']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Submission Category:</p>
                        <Input placeholder='Submission Category' value={form['Submission Category']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Submission Type:</p>
                        <Input placeholder='Submission Type' value={form['Submission Type']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Level:</p>
                        <Input placeholder='Level' value={form['Level']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>ALD created on:</p>
                        {
                            date &&
                            <DatePicker placeholder='Date of ALD Entry' className='w-100' defaultValue={moment(form['ALD created on'], dateFormat)} disabled />
                        }
                    </div>
                    <div className='mt-3'>
                        <p>ALD Last Updated on:</p>
                        {
                            date &&
                            <DatePicker placeholder='Date of ALD Entry' className='w-100' defaultValue={moment(form['ALD Last Updated on'], dateFormat)} disabled />
                        }
                    </div>
                    <div className='mt-3'>
                        <p>ALD Approved on:</p>
                        {
                            date &&
                            <DatePicker placeholder='Date of ALD Entry' className='w-100' defaultValue={moment(form['ALD Approved on'], dateFormat)} disabled />
                        }
                    </div>
                    <div className='mt-3'>
                        <p>ALD Approved By:</p>
                        <Input placeholder='ALD Approved By' value={form['ALD Approved By']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Evaluator sub-Group:</p>
                        <Input placeholder='Evaluator sub-Group' value={form['Evaluator sub-Group']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>USCs	:</p>
                        <Input placeholder='USCs' value={form['USCs']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Purpose of Submission:</p>
                        <Input placeholder='Purpose of Submission' value={form['Purpose of Submission']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Additional Purpose of Submission Comments:</p>
                        <Input placeholder='Additional Purpose of Submission Comments' value={form['Additional Purpose of Submission Comments']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Scoping Document Number:</p>
                        <Input placeholder='Scoping Document Number' value={form['Scoping Document Number']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>SMC BN1:</p>
                        <Input placeholder='SMC BN1' value={form['SMC BN1']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>SMC BN1 Date:</p>
                        <DatePicker placeholder='SMC BN1 Date' defaultValue={moment(form['SMC BN1 Date'], dateFormat)} className='w-100' />
                    </div>
                    <div className='mt-3'>
                        <p>SMC BN2:</p>
                        <Input placeholder='SMC BN2' value={form['SMC BN2']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>SMC BN2 Date:</p>
                        <DatePicker placeholder='SMC BN2 Date' defaultValue={moment(form['SMC BN2 Date'], dateFormat)} className='w-100' />
                    </div>
                    <div className='mt-3'>
                        <p>Proposed Decision Document Number:</p>
                        <Input placeholder='Proposed Decision Document Number' value={form['Proposed Decision Document Number']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Final Decision Document Number:</p>
                        <Input placeholder='Final Decision Document Number' value={form['Final Decision Document Number']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Outcome:</p>
                        <Input placeholder='Outcome' value={form['Outcome']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Aditional Outcome Reasons:</p>
                        <Input placeholder='Aditional Outcome Reasons' value={form['Aditional Outcome Reasons']} readOnly />
                    </div>
                    <div className='mt-3'>
                        <p>Next Assessment Date:</p>
                        <Input placeholder='Next Assessment Date' value={form['Next Assessment Date']} readOnly />
                    </div>
                </div>

                <div className='mt-5' style={{ textAlign: "end" }}>
                    <Link to={`/tox/${form['Anchor Submission Number']}`}>
                        {/* <a target="_blank" href={`https://aldprototype.ca/tox/${form['Anchor Submission Number']}`}> */}
                        <Button className='form-button'>View ALD Report</Button>
                        {/* </a> */}
                    </Link>
                </div>
            </Panel>
        </Collapse>
    )
}

export default Tox