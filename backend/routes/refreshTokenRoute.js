router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const newAccessToken = generateAccessToken(user);

    res.json({ token: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});