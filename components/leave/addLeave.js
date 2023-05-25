import React, { useState } from 'react';
import { extendMoment } from 'moment-range';
import Moment from 'moment';
import Upload from 'antd/lib/upload';

// antd components
import {DatePicker, Space} from 'antd';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import TextArea from 'antd/lib/input/TextArea';
import fileUpload from '../../utils/fileUpload';
const AddLeave = () => {
  // const getDate = (options = 'default') => {
  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, '0');
  //   let mm = String(today.getMonth() + 1).padStart(2, '0');
  //   let yyyy = today.getFullYear();
  //   today = yyyy + '/' + mm + '/' + dd;
  //   if (options === 'API') today = yyyy + '-' + mm + '-' + dd;
  //   console.log(today);
  //   return today;
  // };
  const dateFormat = 'YYYY/MM/DD';
  const { RangePicker } = DatePicker;

  const moment = extendMoment(Moment);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  // const [date, setDate] = useState(getDate('API'));
  const [type, setType] = useState('sick');
  const [startDate, setStartDate]=useState('');
  const [endDate, setEndDate]=useState('');
  const [success, setSuccessText] = useState('');
  const [error, setErrorText] = useState('');
  const [value, setValue] = useState('');

  const query = `
    mutation RecordLeave($startDate: Date!, $endDate: Date!, $reason: String!, $type: String!){
      RecordLeave(startDate: $startDate, endDate: $endDate, reason: $reason, type: $type){
        id
      }
    }
  `;

  const uploadData = async (data) => await fileUpload(data);
  const upload = () => {
    const data = new FormData();
    console.log(startDate, endDate);
    data.append('query', query);
    data.append(
      'variables',
      JSON.stringify({ type, reason, startDate, endDate })
    );
    uploadData({ data }).then((r) => {
      if (Object.prototype.hasOwnProperty.call(r, 'errors')) {
        setErrorText(r.errors[0].message);
        setSuccessText('');
      } else {
        setSuccessText(r.data.id);
        setErrorText('');
      }
    });
  };

  const onChange = (dateString) => {
    // setDate(dateString);
    // console.log(date);
    setStartDate(moment(dateString[0]).format('YYYY-MM-DD'));
    setEndDate(moment(dateString[1]).format('YYYY-MM-DD'));
    // console.log(startDate, endDate);

  };

  return !loading ? (
    <form
      className="form-group"
      onSubmit={(e) => {
        setLoading(true);
        upload();
        e.preventDefault();
      }}

    >
        <div className="col-sm-3">
            <label>Date</label>
            <div className="m-2">
            <Space direction="vertical" size={8}>
            <RangePicker
                size="large"
                onChange={onChange}
                format={dateFormat}
              />
            </Space>
              
            </div>
          </div>
      <div className="page-container">
        <div className="row m-0">
          <div className="col-md-6">
            <label>Reason</label>
            <div className="m-2">
              <TextArea allowClear  maxLength={500} autoSize
                value={reason}
                type="text"
                placeholder="Enter Reason"
                name="reason"
                // className="form-control"
                showCount
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="text-left m-3">
          <button type="submit" className="button btn ant-btn-primary px-3 ml-2">
            Submit
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div>
      {success !== '' ? (
        <Result
          status="success"
          title="Successfully added the your blog!"
          subTitle="Review process initiated :)"
          extra={
            <Link href="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      ) : error !== '' ? (
        <div className="alert alert-danger m-4">{error}</div>
      ) : (
        <div className="alert alert-warning m-4">Submitting. Please Wait</div>
      )}
    </div>
  );
};

export default AddLeave;
