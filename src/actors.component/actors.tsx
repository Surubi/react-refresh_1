import React, { FC, useEffect, useState } from "react";
import { Breadcrumb } from "../breadcrumb.component/breadcrum";
import { callPrivateTestAPI, callPublicTestAPI } from "../api-services/test-api";
import { AxiosResponse } from "axios";

export const Actors: React.FC = () => {

    const [publicData, setPublicData] = useState<String>("");
    const [privateData, setPrivateData] = useState<String>("");

    useEffect(() => {
        callPublicApi();
        callPrivateApi();

    }, []);

    const callPublicApi: any = async () => {
        let res1 = "";

        callPublicTestAPI()
            .then((res: any) => {
                console.log("API response :: " + res);
                setPublicData(data => res.data);
            }).catch(err => {

            });
    }

    const callPrivateApi: any = async () => {
        callPrivateTestAPI().then((res: any) => {
            console.log(res);
            setPrivateData(data => res.data);
        }).catch(err => {

        });

    }
    return (
        <div>
            <Breadcrumb items={['Actors']} />
            <h4>Welcome to Actor List Page</h4>
            <h4>Public Data :: {publicData}</h4>
            <h4>Public Data :: {privateData}</h4>

            <table id="default-table" className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Release Date</th>
                        <th className="px-6 py-3">Downloads</th>
                        <th className="px-6 py-3">Growth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                    <tr><td>Flowbite</td><td>2021/25/09</td><td>269000</td><td>49%</td></tr>
                    <tr><td>React</td><td>2013/24/05</td><td>4500000</td><td>24%</td></tr>
                </tbody>
            </table>
        </div>

    );
}