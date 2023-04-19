import React from 'react'
import { Select, Collapse, Input, Button, DatePicker, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd';
import moment from 'moment'
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const { TextArea } = Input;

const ALDv2_1 = ({ form, index, date }) => {
  const dateFormat = "YYYY-MM-DD";
  return (
    <Collapse accordion className='mb-3'>
      <Panel header={`Value Form ${index + 1}`} key={index}>
        <div>
          <div className='mt-3'>
            <p className='form-heading'>Audit Trail:</p>
            <p>Anchor Sub.No.:</p>
            <Input placeholder='Anchor Sub.No.' value={form['Anchor Submission Number']} readOnly />
          </div>
          <div className='mt-3'>
            <p>PMRA # of this ALD:</p>
            <Input placeholder='PMRA # of this ALD' readOnly />
          </div>
          <div className='mt-3'>
            <p>Sub. Cat. <i>A</i>,<i> B</i>, <i>N</i>:</p>
            <Input placeholder='Sub. Cat.' />
          </div>
          <div className='mt-3'>
            <p>Sub. Type <i>1.1</i>:</p>
            <Input placeholder='Sub. Type' />
          </div>
          <div className='mt-3'>
            <p>Date of ALD Entry <i>YYYY-MM-DD</i>:</p>
            {
              date &&
              <DatePicker placeholder='Date of ALD Entry' className='w-100' defaultValue={moment(date, dateFormat)} disabled />
            }
          </div>
          <div className='mt-3'>
            <p>Name of Evaluator:</p>
            <Input placeholder='Name of Evaluator' value={form['Evaluator']} readOnly />
          </div>
          <div className='mt-3'>
            <p>Purpose of Submission – incl.proposed uses and/or USCs:</p>
            <Input placeholder='Purpose of Submission' value={form['Purpose of Submission']} readOnly />
          </div>
        </div>

        <div>
          <div className='mt-3'>
            <p className='form-heading'>Identify any key value considerations</p>
            <p>Date <i>YYYY-MM-DD</i>:</p>
            <DatePicker placeholder='Date' className='w-100' format={'YYYY-MM-DD'} />
          </div>
          <div className='mt-3'>
            <p>Ref.Doc PMRA#:</p>
            <Input placeholder='Ref.Doc PMRA#' />
          </div>
          <div className='mt-3'>
            <p>Nature of Comment:</p>
            <Input placeholder='Nature of Comment' />
          </div>
          <div className='mt-3'>
            <p>Comments:</p>
            <TextArea rows={5} maxLength={200} placeholder='Comment' showCount />
          </div>
        </div>

        <div>
          <div className='mt-3'>
            <p className='form-heading'>Are there any data or information that should be considered for the next assessment, renewal or re-evaluation?</p>
            <p>Study Type / Document Type:</p>
            <Input placeholder='Study Type / Document Type' />
          </div>
          <div className='mt-3'>
            <p>Loaded into ePRS YES/NO ?</p>
            <Radio.Group
            // onChange={onChange} value={value}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </div>
          <div className='mt-3'>
            <p>Nature of Comment:</p>
            <Input placeholder='Nature of Comment' />
          </div>
          <div className='mt-3'>
            <p>Comments:</p>
            <TextArea rows={5} maxLength={200} placeholder='Comments' showCount />
          </div>
          <div className='mt-3'>
            <p>PMRA# <i>(if applicable)</i>:</p>
            <Input placeholder='PMRA#' />
          </div>
        </div>

        <div>
          <div className='mt-3'>
            <p className='form-heading'>Are there any label considerations to be addressed at next assessment, renewal or re-evaluation (e.g. incomplete, unclear, inconsistent, etc.)?</p>
            <p>Date <i>YYYY-MM-DD</i>:</p>
            <DatePicker placeholder='Date' className='w-100' format={'YYYY-MM-DD'} />
          </div>
          <div className='mt-3'>
            <p>Reg. No:</p>
            <Input placeholder='Reg. No' />
          </div>
          <div className='mt-3'>
            <p>Ref.Doc PMRA# :</p>
            <Input placeholder='PMRA#' />
          </div>
          <div className='mt-3'>
            <p>Nature of Comment:</p>
            <Input placeholder='Nature of Comment' />
          </div>
          <div className='mt-3'>
            <p>Comments:</p>
            <TextArea rows={5} maxLength={200} placeholder='Comments' showCount />
          </div>
        </div>
        <div className='mt-5' style={{ textAlign: "end" }}>
          {/* <a target="_blank" href={`https://aldprototype.ca/value/${form['Anchor Submission Number']}`}> */}
          <Link to={`/value/${form['Anchor Submission Number']}`}>
            <Button className='form-button'>View ALD Report</Button>
          </Link>
          {/* </a> */}
        </div>
      </Panel>
    </Collapse>
  )
}

export default ALDv2_1