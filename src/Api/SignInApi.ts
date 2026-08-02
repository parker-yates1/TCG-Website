const SignInApi = async (username: string, password: string) => {
    const tokenUrl = 'http://localhost:8081/realms/cards/protocol/openid-connect/token';
    const params = new URLSearchParams();
    params.append('client_id', 'trading-card-app');
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!tokenResponse.ok) {
        throw new Error('Sign in failed. Please check your credentials.');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
        throw new Error('There was an error with sign on, please try again.');
    }

    const accountUrl = 'http://localhost:8082/api/accounts/me';
    const accountResponse = await fetch(accountUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!accountResponse.ok) {
        throw new Error('Failed to retrieve account details, please try again.');
    }
    const accountData = await accountResponse.json();
    return accountData;
};

export default SignInApi;