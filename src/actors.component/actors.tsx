import React, { FC } from "react";
import { Breadcrumb } from "../breadcrumb.component/breadcrum";

export const Actors: React.FC = () => {
    return (
        <div>
            <Breadcrumb items={['Actors']} />
            <h4>Welcome to Actor List Page</h4>
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
                </tbody>
            </table>
        </div>

    );
}