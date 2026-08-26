import { Breadcrumb } from "../breadcrumb.component/breadcrum";

export const Settings = () => {
    return (
        <div>
            <Breadcrumb items={['Settings']} />
            <h1>Settings</h1>
            <p>This is the settings page.</p>
        </div>
    );
};