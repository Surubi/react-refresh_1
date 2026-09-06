import React, { useEffect } from "react";
import { Breadcrumb } from "../breadcrumb.component/breadcrum";
import SimpleDataTable from "./simple.datatable.component";

export interface Person {
    name: string,
    age: number,
    city: string,
    state: string,
    pincode: number,
    profession: string
}


export const Films = () => {

    const [data, setData] = React.useState<Person[]>([]);

    useEffect(() => {
        setData(data => [
            {
                "name": "Aarav Sharma",
                "age": 29,
                "city": "Mumbai",
                "state": "Maharashtra",
                "pincode": 400001,
                "profession": "Software Engineer"
            },
            {
                "name": "Priya Patel",
                "age": 34,
                "city": "Ahmedabad",
                "state": "Gujarat",
                "pincode": 380001,
                "profession": "Data Analyst"
            },
            {
                "name": "Rohan Verma",
                "age": 26,
                "city": "Bengaluru",
                "state": "Karnataka",
                "pincode": 560001,
                "profession": "UI/UX Designer"
            },
            {
                "name": "Ananya Iyer",
                "age": 31,
                "city": "Chennai",
                "state": "Tamil Nadu",
                "pincode": 600001,
                "profession": "Content Strategist"
            },
            {
                "name": "Vikram Singh",
                "age": 42,
                "city": "Jaipur",
                "state": "Rajasthan",
                "pincode": 302001,
                "profession": "Architect"
            },
            {
                "name": "Sneha Gupta",
                "age": 28,
                "city": "Delhi",
                "state": "Delhi",
                "pincode": 110001,
                "profession": "Financial Analyst"
            },
            {
                "name": "Rahul Nair",
                "age": 35,
                "city": "Kochi",
                "state": "Kerala",
                "pincode": 682001,
                "profession": "Marketing Manager"
            },
            {
                "name": "Meera Joshi",
                "age": 30,
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": 411001,
                "profession": "HR Specialist"
            },
            {
                "name": "Karan Sen",
                "age": 38,
                "city": "Kolkata",
                "state": "West Bengal",
                "pincode": 700001,
                "profession": "Accountant"
            },
            {
                "name": "Neha Reddy",
                "age": 27,
                "city": "Hyderabad",
                "state": "Telangana",
                "pincode": 500001,
                "profession": "DevOps Engineer"
            },
            {
                "name": "Amit Das",
                "age": 45,
                "city": "Bhubaneswar",
                "state": "Odisha",
                "pincode": 751001,
                "profession": "Civil Engineer"
            },
            {
                "name": "Pooja Malhotra",
                "age": 33,
                "city": "Chandigarh",
                "state": "Punjab",
                "pincode": 160001,
                "profession": "Graphic Designer"
            },
            {
                "name": "Siddharth Roy",
                "age": 29,
                "city": "Guwahati",
                "state": "Assam",
                "pincode": 781001,
                "profession": "Research Scientist"
            },
            {
                "name": "Divya Kulkarni",
                "age": 32,
                "city": "Nagpur",
                "state": "Maharashtra",
                "pincode": 440001,
                "profession": "Quality Assurance Lead"
            },
            {
                "name": "Varun Mishra",
                "age": 40,
                "city": "Lucknow",
                "state": "Uttar Pradesh",
                "pincode": 226001,
                "profession": "Operations Manager"
            },
            {
                "name": "Kavya Deshmukh",
                "age": 25,
                "city": "Indore",
                "state": "Madhya Pradesh",
                "pincode": 452001,
                "profession": "Digital Marketer"
            },
            {
                "name": "Manish Kumar",
                "age": 37,
                "city": "Patna",
                "state": "Bihar",
                "pincode": 800001,
                "profession": "System Administrator"
            },
            {
                "name": "Ritu Bhatia",
                "age": 31,
                "city": "Dehradun",
                "state": "Uttarakhand",
                "pincode": 248001,
                "profession": "Product Manager"
            },
            {
                "name": "Arjun Mehta",
                "age": 29,
                "city": "Surat",
                "state": "Gujarat",
                "pincode": 395001,
                "profession": "Business Analyst"
            },
            {
                "name": "Shweta Rao",
                "age": 36,
                "city": "Visakhapatnam",
                "state": "Andhra Pradesh",
                "pincode": 530001,
                "profession": "Cybersecurity Analyst"
            }
        ]);
    }, []);



    return (
        <div className="grid h-56 grid-cols-3 content-start gap-4 ...">
            <div className="col col-3">
                <SimpleDataTable data={data} />
            </div>
        </div>
    );
}