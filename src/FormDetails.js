import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, message, Input, Select, DatePicker } from 'antd'
import GeneralInfo2 from './generalinfopopups/GeneralInfo2'
import RegulatoryHistory from './generalinfopopups/RegulatoryHistory'
import Form3_2 from './generalinfopopups/Form3_2'
import Form3_3 from './generalinfopopups/Form3_3'
import Form3_4 from './generalinfopopups/Form3_4'
import Form3_5 from './generalinfopopups/Form3_5'
import Form4 from './generalinfopopups/Form4'
import Form4_4 from './generalinfopopups/Form4_4'
import Form4_5 from './generalinfopopups/Form4_5'
import Form4_6 from './generalinfopopups/Form4_6'
import Form4_7 from './generalinfopopups/Form4_7'
import Form5 from './generalinfopopups/Form5'
import CommentBox from './CommentBox'
import { baseUrl, shortUrl } from './helper'

const FormDetails = () => {
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false)
    const param = useParams();
    const [form2, setForm2] = useState(false)
    const [form3, setForm3] = useState(false)
    const [form32, setForm32] = useState(false)
    const [form33, setForm33] = useState(false)
    const [form34, setForm34] = useState(false)
    const [form35, setForm35] = useState(false)
    const [form4, setForm4] = useState(false)
    const [form44, setForm44] = useState(false)
    const [form45, setForm45] = useState(false)
    const [form46, setForm46] = useState(false)
    const [form47, setForm47] = useState(false)
    const [form5, setForm5] = useState(false)
    const [form2Data, setForm2Data] = useState([])
    const [form3Data, setForm3Data] = useState([])
    const [form3_2Data, setForm3_2Data] = useState([])
    const [form3_3Data, setForm3_3Data] = useState([])
    const [form3_4Data, setForm3_4Data] = useState([])
    const [form3_5Data, setForm3_5Data] = useState([])
    const [form4Data, setForm4Data] = useState([])
    const [form4_4Data, setForm4_4Data] = useState([])
    const [form4_5Data, setForm4_5Data] = useState([])
    const [form4_6Data, setForm4_6Data] = useState([])
    const [form4_7Data, setForm4_7Data] = useState([])
    const [form5Data, setForm5Data] = useState([])
    const [formProp, setFormProp] = useState({})

    const [approvalBody, setApprovalBody] = useState()
    const [comments, setComments] = useState()

    function getComments() {
        axios.get(`${baseUrl}sectionheadfeedback/${param.submissionNumber}/General%20Info`)
            .then((resp) => {
                setComments(resp.data[0])
            }).catch((err) => {
                console.log('error')
            })
    }

    useEffect(() => {
        if (tableData) {
            const obj = {
                "SubmissionNumber": param.submissionNumber,
                "Comments": "",
                "Feedback": "Pending",
                "DateofFeedback": "",
                "activeCode": tableData?.['Active Code'],
                "Form": "TOX",
                "FormLink": `${shortUrl}/environment/${param.submissionNumber}?shmode=1`,
                "SectionHeadName": tableData?.['ALD Approved By'],
                "EvaluatorName": tableData?.Evaluator,
                "updated": moment().format('YYYY-MM-DD'),
                "flags": 0,
                "id": 0
            }
            setApprovalBody(obj)
        }
    }, [tableData])


    function handleApproval() {
        setLoading(true)
        axios.put(`${baseUrl}sectionheadfeedback/${approvalBody.id}`, approvalBody)
            .then((resp) => {
                setLoading(false)
                message.success('Requested for approval')
            }).catch((err) => {
                setLoading(false)
                message.erorr('Error')
            })
    }

    function updateTableData() {
        tableData['ALD Last Updated on'] = moment(tableData['ALD Last Updated on']).format('YYYY-MM-DD')
        tableData['ALD created on'] = moment(tableData['ALD created on']).format('YYYY-MM-DD')
        tableData['Initiation Date'] = moment(tableData['Initiation Date']).format('YYYY-MM-DD')
        setLoading(true)
        axios.put(`${baseUrl}data/${param.submissionNumber}`, tableData)
            .then((resp) => {
                getFormData()
                setLoading(false)
                message.success('Updated')
            })
            .catch((err) => {
                setLoading(false)
                message.error('Error')
            })
    }

    function getFormData() {
        axios.get(`${baseUrl}value/${param.submissionNumber}`)
            .then((resp) => {
                const filterGenInfoForms = resp.data?.filter(item => item['ALD Report to Generate'] === 'General Info')
                setTableData(filterGenInfoForms[0])
            })
    }

    function getForm2Data() {
        axios.get(`${baseUrl}geninfosection2data/${param.submissionNumber}`)
            .then((resp) => {
                setForm2Data(resp.data)
            })
    }

    function deleteForm2Data(id) {
        axios.delete(`${baseUrl}geninfosection2data/${id}`)
            .then((resp) => {
                getForm2Data()
                message.success('Record Deleted')
            })
    }

    function getForm3Data() {
        axios.get(`${baseUrl}geninfosection3data/${param.submissionNumber}`)
            .then((resp) => {
                const filterForm3 = resp.data?.filter(item => item.Subsection_Name === "Initial TGAI registration")
                setForm3Data(filterForm3)
                const filterForm3_2 = resp.data?.filter(item => item.Subsection_Name === "Completed (i-Done) or Open Re-evaluation")
                setForm3_2Data(filterForm3_2)
                const filterForm3_3 = resp.data?.filter(item => item.Subsection_Name === "Completed (i-Done) or Open Special Review")
                setForm3_3Data(filterForm3_3)
            })
    }

    function deleteForm3Data(id) {
        axios.delete(`${baseUrl}geninfosection3data/${id}`)
            .then((resp) => {
                getForm3Data()
                message.success('Record Deleted')
            })
    }

    function getForm3_4Data() {
        axios.get(`${baseUrl}geninfotgairegistrantslist/${param.submissionNumber}`)
            .then((resp) => {
                setForm3_4Data(resp.data)
            })
    }

    function deleteForm3_4Data(id) {
        axios.delete(`${baseUrl}geninfotgairegistrantslist/${id}`)
            .then((resp) => {
                getForm3_4Data()
                message.success('Record Deleted')
            })
    }

    function getForm3_5Data() {
        axios.get(`${baseUrl}geninforegulatorstable/${param.submissionNumber}`)
            .then((resp) => {
                setForm3_5Data(resp.data)
            })
    }

    function deleteForm3_5Data(id) {
        axios.delete(`${baseUrl}geninforegulatorstable/${id}`)
            .then((resp) => {
                getForm3_5Data()
                message.success('Record Deleted')
            })
    }

    function getForm4Data() {
        axios.get(`${baseUrl}geninfobackgrounddata/${param.submissionNumber}`)
            .then((resp) => {
                setForm4Data(resp.data)
            })
    }

    function deleteForm4Data(id) {
        axios.delete(`${baseUrl}geninfobackgrounddata/${id}`)
            .then((resp) => {
                getForm4Data()
                message.success('Record Deleted')
            })
    }

    function getForm4_4Data() {
        axios.get(`${baseUrl}geninfoepmarketingdata/${param.submissionNumber}`)
            .then((resp) => {
                setForm4_4Data(resp.data)
            })
    }

    function deleteForm4_4Data(id) {
        axios.delete(`${baseUrl}geninfoepmarketingdata/${id}`)
            .then((resp) => {
                getForm4_4Data()
                message.success('Record Deleted')
            })
    }

    function getForm4_5Data() {
        axios.get(`${baseUrl}geninforoebcomplianceaudittrail/${param.submissionNumber}`)
            .then((resp) => {
                setForm4_5Data(resp.data)
            })
    }

    function deleteForm4_5Data(id) {
        axios.delete(`${baseUrl}geninforoebcomplianceaudittrail/${id}`)
            .then((resp) => {
                getForm4_5Data()
                message.success('Record Deleted')
            })
    }

    function getForm4_6Data() {
        axios.get(`${baseUrl}geninfoinfolinetable/${param.submissionNumber}`)
            .then((resp) => {
                setForm4_6Data(resp.data)
            })
    }

    function deleteForm4_6Data(id) {
        axios.delete(`${baseUrl}geninfoinfolinetable/${id}`)
            .then((resp) => {
                getForm4_6Data()
                message.success('Record Deleted')
            })
    }

    function getForm4_7Data() {
        axios.get(`${baseUrl}geninfotgaiepunfulfilledconditionstable/${param.submissionNumber}`)
            .then((resp) => {
                setForm4_7Data(resp.data)
            })
    }

    function deleteForm4_7Data(id) {
        axios.delete(`${baseUrl}geninfotgaiepunfulfilledconditionstable/${id}`)
            .then((resp) => {
                getForm4_7Data()
                message.success('Record Deleted')
            })
    }

    function getForm5Data() {
        axios.get(`${baseUrl}geninfoscienceteamaldstable/${param.submissionNumber}`)
            .then((resp) => {
                setForm5Data(resp.data)
            })
    }

    function deleteForm5Data(id) {
        axios.delete(`${baseUrl}geninfoscienceteamaldstable/${id}`)
            .then((resp) => {
                getForm5Data()
                message.success('Record Deleted')
            })
    }


    useEffect(() => {
        getFormData()
        getForm2Data()
        getForm3Data()
        getForm3_4Data()
        getForm3_5Data()
        getForm4Data()
        getForm4_4Data()
        getForm4_5Data()
        getForm4_6Data()
        getForm4_7Data()
        getForm5Data()
        getComments()
    }, [])

    function handleTableData(name, value) {
        setTableData({ ...tableData, [name]: value })
    }

    function handlebn1Date(date, dateString) {
        handleTableData('SMC BN1 Date', dateString)
    }

    function handlebn2Date(date, dateString) {
        handleTableData('SMC BN2 Date', dateString)
    }

    function handlenextDate(date, dateString) {
        handleTableData('Next Assessment Date', dateString)
    }

    return (
        <div className='form-detail'>
            <div className='box mt-5'>
                <div className='d-flex align-items-center justify-content-between'>
                    <p style={{ fontSize: '18px' }} className="mb-3">1. Main</p>
                    <div className='d-flex align-items-center'>
                        <Button onClick={() => window.print()} className='form-button'>Print Form</Button>
                        <Button className='form-button' onClick={() => handleApproval()} disabled={loading} loading={loading}>Request Approval</Button>
                    </div>
                </div>
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Anchor Submission Number:</th>
                            <td><Input value={tableData && tableData['Anchor Submission Number']} onChange={(e) => handleTableData('Anchor Submission Number', e.target.value)} />
                                {/* {!tableData ? null : tableData['Anchor Submission Number']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Report to Generate:	</th>
                            <td>{!tableData ? null : tableData['ALD Report to Generate']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Evaluator:	</th>
                            <td>{!tableData ? null : tableData['Evaluator']}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Required:	</th>
                            <td>{!tableData ? null : tableData['ALD Required'] === 1 ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Program Activity:	</th>
                            <td>{!tableData ? null : tableData['Program Activity']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Active Code:	</th>
                            <td>{!tableData ? null : tableData['Active Code']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Active Name:		</th>
                            <td>{!tableData ? null : tableData['Active Name']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cluster Name:		</th>
                            <td>{!tableData ? null : tableData['Cluster Name']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Related Submission Numbers:		</th>
                            <td>{!tableData ? null : tableData['Related Submission Numbers']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Initiation Date:			</th>
                            <td>{!tableData ? null : moment(tableData['Initiation Date']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Number:		</th>
                            <td>{!tableData ? null : tableData['ALD Number']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Submission Category:		</th>
                            <td>{!tableData ? null : tableData['Submission Category']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Submission Type:		</th>
                            <td>{!tableData ? null : tableData['Submission Type']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Level:		</th>
                            <td>{!tableData ? null : tableData['Level']}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD created on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD created on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Last Updated on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD Last Updated on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Approved on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD Approved on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Approved By:		</th>
                            <td>{!tableData ? null : tableData['ALD Approved By']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Evaluator Sub-Group:		</th>
                            <td>{!tableData ? null : tableData['Evaluator sub-Group']}</td>
                        </tr>
                        <tr>
                            <th scope="row">USCs:		</th>
                            <td><Input value={tableData && tableData['USCs']} onChange={(e) => handleTableData('USCs', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Purpose of Submission:		</th>
                            {/* <td>{!tableData ? null : tableData['Purpose of Submission']}</td> */}
                            <td>
                                <Select options={[
                                    { value: 'Major New Use', label: 'Major New Use' },
                                    { value: 'Major Use', label: 'Major Use' },
                                    { value: 'Minor Use', label: 'Minor Use' },
                                    { value: 'Re-evaluation', label: 'Re-evaluation' },
                                    { value: 'Special Review', label: 'Special Review' },
                                    { value: 'Cumulative Risk Assessment', label: 'Cumulative Risk Assessment' },
                                    { value: 'Notice of Objection-PA2', label: 'Notice of Objection-PA2' },
                                    { value: 'Notice of Objection-PA1', label: 'Notice of Objection-PA1' },
                                ]} onChange={(e) => handleTableData('Purpose of Submission', e)} value={tableData && tableData['Purpose of Submission']} className="w-100" placeholder='Purpose of Submission' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Additional Purpose of Submission Comments:		</th>
                            <td><Input value={tableData && tableData['Additional Purpose of Submission Comments']} onChange={(e) => handleTableData('Additional Purpose of Submission Comments', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Scoping Document Number:		</th>
                            <td><Input value={tableData && tableData['Scoping Document Number']} onChange={(e) => handleTableData('Scoping Document Number', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN1:		</th>
                            <td><Input value={tableData && tableData['SMC BN1']} onChange={(e) => handleTableData('SMC BN1', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN1 Date:		</th>
                            {/* <td>{!tableData ? null : moment(tableData['SMC BN1 Date']).format('DD-MM-YYYY')}</td> */}
                            <td>
                                <DatePicker onChange={handlebn1Date}
                                    // value={tableData && tableData['SMC BN1 Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN2:		</th>
                            <td>
                                {!tableData ? null : tableData['SMC BN2']}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN2 Date:		</th>
                            {/* <td>{!tableData ? null : moment(tableData['SMC BN2 Date']).format('DD-MM-YYYY')}</td> */}
                            <td>
                                <DatePicker onChange={handlebn2Date}
                                    // value={tableData && tableData['SMC BN2 Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Proposed Decision Document Number:		</th>
                            {/* <td>{!tableData ? null : tableData['Proposed Decision Document Number']}</td> */}
                            <td><Input value={tableData && tableData['Proposed Decision Document Number']} onChange={(e) => handleTableData('Proposed Decision Document Number', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Final Decision Document Number:		</th>
                            {/* <td>{!tableData ? null : tableData['Final Decision Document Number']}</td> */}
                            <td><Input value={tableData && tableData['Final Decision Document Number']} onChange={(e) => handleTableData('Final Decision Document Number', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Outcome:		</th>
                            {/* <td>{!tableData ? null : tableData['Outcome']}</td> */}
                            <td>
                                <Select options={[
                                    { value: 'Registered', label: 'Registered' },
                                    { value: 'Continued Registration', label: 'Continued Registration' },
                                    { value: 'Voluntarily Withdrawal', label: 'Voluntarily Withdrawal' },
                                    { value: 'PMRA Rejected', label: 'PMRA Rejected' },
                                    { value: 'Panel', label: 'Panel' },
                                    { value: 'No Panel', label: 'No Panel' },
                                    { value: 'Other', label: 'Other' },
                                ]} onChange={(e) => handleTableData('Outcome', e)} value={tableData && tableData['Outcome']} className="w-100" placeholder='Outcome' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Additional Outcome Reasons:		</th>
                            {/* <td>{!tableData ? null : tableData['Aditional Outcome Reasons']}</td> */}
                            <td><Input value={tableData && tableData['Aditional Outcome Reasons']} onChange={(e) => handleTableData('Aditional Outcome Reasons', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Next Assessment Date:		</th>
                            {/* <td>{!tableData ? null : tableData['Next Assessment Date']}</td> */}
                            <td>
                                <DatePicker onChange={handlenextDate}
                                    // value={tableData && tableData['Next Assessment Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className='form-button' loading={loading} disabled={loading} onClick={updateTableData}>Update Record</Button>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">2. Active Ingredient Identity</p>
                <Button className='mb-3 form-button' onClick={() => setForm2(true)}>Add new record</Button>
                <GeneralInfo2 open={form2} setOpen={setForm2} data={formProp} getFormData={getForm2Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>Subsection Name	</td>
                                <td>Active Code		</td>
                                <td>Active Name		</td>
                                <td>CAS Number		</td>
                                <td>Edit		</td>
                                <td>Delete		</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form2Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Subsection_Name}</td>
                                            <td>{data?.Active_Code}</td>
                                            <td>{data?.Active_Name}</td>
                                            <td>{data?.CAS_Number}</td>
                                            <td><Button className='form-button' onClick={() => { setForm2(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm2Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">3. Regulatory History</p>
                <p style={{ fontSize: '15px' }} className="mb-3">3.1. Initial TGAI registration</p>
                <Button className='form-button mb-3' onClick={() => { setForm3(true) }}>Add New Record</Button>
                <RegulatoryHistory open={form3} setOpen={setForm3} data={formProp} getFormData={getForm3Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <td>First Registered Date		</td>
                                <td>First Registration Submission Number			</td>
                                <td>First Registration Submission Type			</td>
                                <td>Registration Number			</td>
                                <td>Registration Status				</td>
                                <td>Associated Publication RDD				</td>
                                <td>PMRA Number RDD				</td>
                                <td>Date of SMC2 BN for RDD				</td>
                                <td>Edit				</td>
                                <td>Delete				</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.First_Registered_Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.First_Registration_Submission_Number}</td>
                                            <td>{data?.First_Registration_Submission_Type}</td>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.Registration_Status}</td>
                                            <td>{data?.Associated_Publication_RDD}</td>
                                            <td>{data?.PMRA_Number_RDD}</td>
                                            <td>{moment(data?.Date_of_SMC2_BN_for_RDD).format('DD-MM-YYYY')}</td>
                                            <td><Button className='form-button' onClick={() => { setForm3(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">3.2. Completed (i-Done) or Open Re-evaluation</p>
                <Button className='form-button mb-3' onClick={() => { setForm32(true) }}>Add New Record</Button>
                <Form3_2 open={form32} setOpen={setForm32} data={formProp} getFormData={getForm3Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>Re-Evaluation Status</td>
                                <td>Last Status Update Date			</td>
                                <td>Re-Evaluation Submission Number				</td>
                                <td>Re-Evaluation Submission Category				</td>
                                <td>Re-Evaluation Submission Type					</td>
                                <td>Scoping Document PMRA Number					</td>
                                <td>Category				</td>
                                <td>Associated Publication PRVD					</td>
                                <td>PMRA Number PRVD						</td>
                                <td>Date of SMC2 BN for PRVD						</td>
                                <td>PMRA Number SMC2 PRVD						</td>
                                <td>Associated Publication RVD							</td>
                                <td>PMRA Number RVD							</td>
                                <td>Date of SMC2 BN for RVD						</td>
                                <td>PMRA Number SMC2 RVD						</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3_2Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Re_Evaluation_Status}</td>
                                            <td>{data?.Last_Status_Update_Date}</td>
                                            <td>{data?.Re_Evaluation_Submission_Number}</td>
                                            <td>{data?.Re_Evaluation_Submission_Category}</td>
                                            <td>{data?.Re_Evaluation_Submission_Type}</td>
                                            <td>{data?.Scoping_Document_PMRA_Number}</td>
                                            <td>{data?.Category}</td>
                                            <td>{data?.Associated_Publication_PRVD}</td>
                                            <td>{data?.PMRA_Number_PRVD}</td>
                                            <td>{data?.Date_of_SMC2_BN_for_PRVD}</td>
                                            <td>{data?.PMRA_Number_SMC2_PRVD}</td>
                                            <td>{data?.Associated_Publication_RVD}</td>
                                            <td>{data?.PMRA_Number_RVD}</td>
                                            <td>{data?.Date_of_SMC2_BN_for_RVD}</td>
                                            <td>{data?.PMRA_Number_SMC2_RVD}</td>
                                            <td><Button className='form-button' onClick={() => { setForm32(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">3.3. Completed (i-Done) or Open Special Review</p>
                <Button className='form-button mb-3' onClick={() => { setForm33(true) }}>Add New Record</Button>
                <Form3_3 open={form33} setOpen={setForm33} data={formProp} getFormData={getForm3Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td style={{ width: 'auto' }}>Special Review Status/Status	</td>
                                <td>Special Review Last Status Update Date				</td>
                                <td>Special Review Submission Number					</td>
                                <td>Special Review Submission Category					</td>
                                <td>Special Review Submission Type						</td>
                                <td>Preliminary Analysis PMRA Document Number						</td>
                                <td>Trigger				</td>
                                <td>Associated Publication PSR						</td>
                                <td>PMRA Number PSR						</td>
                                <td>Date of SMC2 BN for PSR						</td>
                                <td>PMRA Number SMC2 PSR						</td>
                                <td>Associated Publication SRD								</td>
                                <td>PMRA Number SRD							</td>
                                <td>Date of SMC2 BN for SRD							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3_3Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Special_Review_Status_Status}</td>
                                            <td>{data?.Special_Review_Last_Status_Update_Date}</td>
                                            <td>{data?.Special_Review_Submission_Number}</td>
                                            <td>{data?.Special_Review_Submission_Category}</td>
                                            <td>{data?.Special_Review_Submission_Type}</td>
                                            <td>{data?.Preliminary_Analysis_PMRA_Document_Number}</td>
                                            <td>{data?.Trigger}</td>
                                            <td>{data?.Associated_Publication_PSR}</td>
                                            <td>{data?.PMRA_Number_PSR}</td>
                                            <td>{data?.Date_of_SMC2_BN_for_PSR}</td>
                                            <td>{data?.PMRA_Number_SMC2_PSR}</td>
                                            <td>{data?.Associated_Publication_SRD}</td>
                                            <td>{data?.PMRA_Number_SMC2_SRD}</td>
                                            <td>{data?.Date_of_SMC2_BN_for_SRD}</td>
                                            <td><Button className='form-button' onClick={() => { setForm33(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">3.4. TGAI Registrants List</p>
                <Button className='form-button mb-3' onClick={() => { setForm34(true) }}>Add New Record</Button>
                <Form3_4 open={form34} setOpen={setForm34} data={formProp} getFormData={getForm3_4Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Registrant Name	</td>
                                <td>Registrant Assigned Code				</td>
                                <td>Registrant Assigned Number					</td>
                                <td>Registration Number					</td>
                                <td>Date First Registered						</td>
                                <td>Initial Submission Category						</td>
                                <td>Initial Submission Type					</td>
                                <td>USC List						</td>
                                <td>Registration Status							</td>
                                <td>Comments						</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3_4Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Registrant_Name}</td>
                                            <td>{data?.Registrant_Assigned_Code}</td>
                                            <td>{data?.Registrant_Assigned_Number}</td>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.Date_First_Registered}</td>
                                            <td>{data?.Initial_Submission_Category}</td>
                                            <td>{data?.Initial_Submission_Type}</td>
                                            <td>{data?.USC_List}</td>
                                            <td>{data?.Registration_Status}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm34(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3_4Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">3.5. Domestic and Internation Regulatory Status of Active Ingredient</p>
                <Button className='form-button mb-3' onClick={() => { setForm35(true) }}>Add New Record</Button>
                <Form3_5 open={form35} setOpen={setForm35} data={formProp} getFormData={getForm3_5Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Regulator		</td>
                                <td>Status of Active Ingredient					</td>
                                <td>Status Date						</td>
                                <td>Comments					</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3_5Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Regulator}</td>
                                            <td>{data?.Status_of_Active_Ingredient}</td>
                                            <td>{moment(data?.Status_date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm35(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3_5Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">4. Background and Additional Information</p>
                <p style={{ fontSize: '15px' }} className="mb-3">4.1-4.3 Pre-Submission Consultations,Emergency Registrations & Research Authorizations</p>
                <Button className='form-button mb-3' onClick={() => { setForm4(true) }}>Add New Record</Button>
                <Form4 open={form4} setOpen={setForm4} data={formProp} getFormData={getForm4Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Subsection Name			</td>
                                <td>Subsection ID						</td>
                                <td>Conducted						</td>
                                <td>Submission Status Level						</td>
                                <td>Submission Status Activity							</td>
                                <td>PMRA Number							</td>
                                <td>Purpose						</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Subsection_Name}</td>
                                            <td>{data?.Subsection_ID}</td>
                                            <td>{data?.Conducted}</td>
                                            <td>{data?.Submission_Status_Level}</td>
                                            <td>{data?.Submission_Status_Activity}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Purpose}</td>
                                            <td><Button className='form-button' onClick={() => { setForm4(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">4.4 End Product Marketing</p>
                <Button className='form-button mb-3' onClick={() => { setForm44(true) }}>Add New Record</Button>
                <Form4_4 open={form44} setOpen={setForm44} data={formProp} getFormData={getForm4_4Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Restrictions			</td>
                                <td>Registration Number							</td>
                                <td>Product Name							</td>
                                <td>Historical						</td>
                                <td>Current							</td>
                                <td>Form Submission Number								</td>
                                <td>Edit								</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4_4Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Restrictions}</td>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.Product_Name}</td>
                                            <td>{data?.Historical}</td>
                                            <td>{data?.Current}</td>
                                            <td>{data?.From_Submission_Number}</td>
                                            <td><Button className='form-button' onClick={() => { setForm44(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4_4Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">4.5 ROEB Compliance Audit Trail</p>
                <Button className='form-button mb-3' onClick={() => { setForm45(true) }}>Add New Record</Button>
                <Form4_5 open={form45} setOpen={setForm45} data={formProp} getFormData={getForm4_5Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Sector			</td>
                                <td>PCPA Contravention								</td>
                                <td>Date of Reported Contravention								</td>
                                <td>Product Description at Time of Contravention							</td>
                                <td>Corrective Action Taken								</td>
                                <td>Compliance Status of Registrant at Time of Contravention	</td>
                                <td>Additional Information</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4_5Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Sector}</td>
                                            <td>{data?.PCPA_Contravention}</td>
                                            <td>{moment(data?.Date_Of_Reported_Contravention).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Product_Description}</td>
                                            <td>{data?.Corrective_Action_Taken}</td>
                                            <td>{data?.Compliance_Status_Of_Registrant_At_Time_Of_Contravention}</td>
                                            <td>{data?.Additional_Information}</td>
                                            <td><Button className='form-button' onClick={() => { setForm45(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4_5Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">4.6 Information from Call-Line</p>
                <Button className='form-button mb-3' onClick={() => { setForm46(true) }}>Add New Record</Button>
                <Form4_6 open={form46} setOpen={setForm46} data={formProp} getFormData={getForm4_6Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Date Received				</td>
                                <td>Comments Received	</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4_6Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.Date_Received).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Comments_Received}</td>
                                            <td><Button className='form-button' onClick={() => { setForm46(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4_6Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">4.7 TGAI and Eps Unfulfilled Conditions</p>
                <Button className='form-button mb-3' onClick={() => { setForm47(true) }}>Add New Record</Button>
                <Form4_7 open={form47} setOpen={setForm47} data={formProp} setData={setFormProp} getFormData={getForm4_7Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>State				</td>
                                <td>TGAI_EP_MA		</td>
                                <td>Registration Number			</td>
                                <td>PMRA Number			</td>
                                <td>Due Date			</td>
                                <td>DACO Number			</td>
                                <td>Unfulfilled Requirements			</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4_7Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.State}</td>
                                            <td>{data?.TGAI_EP_MA}</td>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{moment(data?.Due_date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.DACO_Number}</td>
                                            <td>{data?.Unfulfilled_Requirements}</td>
                                            <td><Button className='form-button' onClick={() => { setForm47(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4_7Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">5. ALD Science Group Involvement</p>
                <Button className='form-button mb-3' onClick={() => { setForm5(true) }}>Add New Record</Button>
                <Form5 open={form5} setOpen={setForm5} data={formProp} setData={setFormProp} getFormData={getForm5Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>TOX				</td>
                                <td>TOX Details			</td>
                                <td>Dietary			</td>
                                <td>Dietary Details				</td>
                                <td>Occupational			</td>
                                <td>Occupational Details				</td>
                                <td>IRP			</td>
                                <td>IRP Details				</td>
                                <td>RRS			</td>
                                <td>RRS Details				</td>
                                <td>EAD			</td>
                                <td>EAD Details				</td>
                                <td>EAD WM				</td>
                                <td>EAD WM Details				</td>
                                <td>VALUE			</td>
                                <td>VALUE Details				</td>
                                <td>CES			</td>
                                <td>CES Details				</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form5Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.TOX}</td>
                                            <td>{data?.TOX_Details}</td>
                                            <td>{data?.Dietary}</td>
                                            <td>{data?.Dietary_Details}</td>
                                            <td>{data?.Occupational}</td>
                                            <td>{data?.Occupational_Details}</td>
                                            <td>{data?.IRP}</td>
                                            <td>{data?.IRP_Details}</td>
                                            <td>{data?.RRS}</td>
                                            <td>{data?.RRS_Details}</td>
                                            <td>{data?.EAD}</td>
                                            <td>{data?.EAD_Details}</td>
                                            <td>{data?.EAD_WM}</td>
                                            <td>{data?.EAD_WM_Details}</td>
                                            <td>{data?.VALUE}</td>
                                            <td>{data?.VALUE_Details}</td>
                                            <td>{data?.CES}</td>
                                            <td>{data?.CES_Details}</td>
                                            <td><Button className='form-button' onClick={() => { setForm5(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm5Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <CommentBox comments={comments} />
        </div>
    )
}

export default FormDetails