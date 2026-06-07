const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/report', async (req, res) => {
    const { profileUrl, reason, cookies } = req.body;
    try {
        let username = profileUrl.match(/@([\w.]+)/)?.[1] || profileUrl.split('@').pop().split('?')[0];
        const reportUrl = `https://www.tiktok.com/aweme/v2/aweme/feedback/?aid=1988&report_type=1&object_id=${username}&reason=${reason}`;

        const response = await fetch(reportUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
                'Cookie': cookies || '',
                'Referer': 'https://www.tiktok.com/'
            }
        });

        const text = await response.text();
        res.json({ success: response.ok, status: response.status, text });
    } catch(e) {
        res.json({ success: false, error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));