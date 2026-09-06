


const HomeContentComponent = () => {
    const token = localStorage.getItem('kc_token');
    const refreshToken = localStorage.getItem('kc_refresh_token');
    const refreshTokenExpiration = localStorage.getItem('kc_refresh_token_expiration');

    const decodedToken = (token && token !== 'undefined') ? JSON.parse(atob(token.split('.')[1])) : null;
    const decodedRefreshToken = refreshToken ? JSON.parse(atob(refreshToken.split('.')[1])) : null;
    const header = (token && token !== 'undefined') ? JSON.parse(atob(token.split('.')[0])) : null;

    return (
        // <div className="flex flex-col h-screen">
        <div className="col-span-3">
            {token && decodedToken && (
                <div className="">
                    <h2 className="">Token Information</h2>
                    <p><strong>Access Token:</strong> {token}</p>
                    <p><strong>Expires:</strong> {new Date(decodedToken.exp * 1000).toLocaleString()}</p>
                    <p><strong>decoded token:</strong> {JSON.stringify(decodedToken)}</p>
                    <p><strong>decoded header:</strong> {JSON.stringify(header)}</p>
                </div>
            )}
            {refreshToken && decodedRefreshToken && (
                <div className="">
                    <h2 className="">Refresh Token Information</h2>
                    <p><strong>Refresh Token:</strong> {refreshToken}</p>
                    <p><strong>Expires:</strong> {new Date(parseInt(refreshTokenExpiration!) * 1000).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default HomeContentComponent;