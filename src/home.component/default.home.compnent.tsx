


const HomeContentComponent = () => {
     const token = localStorage.getItem('kc_token');
      const refreshToken = localStorage.getItem('kc_refresh_token');
      const refreshTokenExpiration = localStorage.getItem('kc_refresh_token_expiration');
    
      const decodedToken = (token && token !== 'undefined') ? JSON.parse(atob(token.split('.')[1])) : null;
      const decodedRefreshToken = refreshToken ? JSON.parse(atob(refreshToken.split('.')[1])) : null;

    return (
        // <div className="flex flex-col h-screen">

            <div className="items-center justify-center">
                 {token && decodedToken && (
                        <div className="p-4 bg-gray-100 rounded mb-4">
                          <h2 className="text-lg font-semibold">Token Information</h2>
                          <p><strong>Access Token:</strong> {token}</p>
                          <p><strong>Expires:</strong> {new Date(decodedToken.exp * 1000).toLocaleString()}</p>
                          <p><strong>decoded:</strong> {JSON.stringify(decodedToken)}</p>
                        </div>
                      )}
                      {refreshToken && decodedRefreshToken && (
                        <div className="p-4 bg-gray-100 rounded mb-4">
                          <h2 className="text-lg font-semibold">Refresh Token Information</h2>
                          <p><strong>Refresh Token:</strong> {refreshToken}</p>
                          <p><strong>Expires:</strong> {new Date(parseInt(refreshTokenExpiration!) * 1000).toLocaleString()}</p>
                        </div>
                      )}
            </div>
        // </div>
    );
};

export default HomeContentComponent;