const studentDatabase = {
    "200871904626": { 
      name: "FAEES ZAINAB SANAH", 
        result: ""  
    }

    "200871403665": { 
      name: "FAHEER FATHIMA INASA"
        result: "" 
}
    
    // மேலதிக மாணவர்களின் விபரங்களை இங்கே வரிசையாகச் சேர்க்கலாம்
};

function searchStudent() {
    const nic = document.getElementById("nicInput").value.trim();
    
    if (studentDatabase[nic]) {
        const student = studentDatabase[nic];
        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        const formattedDate = `Date: ${day}/${month}/${year}`;

        // புதிய பக்கத்தை திறத்தல்
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ta" style="height: 100%; margin: 0; padding: 0;">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>Result - ${nic}</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
                
                <style>
                    * { box-sizing: border-box; }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #d4e6f1;
                        margin: 0;
                        padding: 15px;
                        overflow: hidden;
                        position: relative;
                        height: 100%;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }

                    .result-card {
                        position: relative;
                        width: 100%;
                        max-width: 520px;
                        padding: 40px;
                        padding-bottom: 100px;
                        background-color: #ffffff;
                        border: 3px solid #1a5276;
                        border-top: 6px solid #2ecc71;
                        border-radius: 14px;
                        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
                        text-align: center;
                        z-index: 10;
                    }

                    .header-container {
                        text-align: center;
                        border-bottom: 3px solid #2ecc71;
                        padding-bottom: 12px;
                        margin-bottom: 18px;
                    }

                    .print-brand {
                        margin: 0;
                        color: #1a5276;
                        font-size: 28px;
                        font-weight: bold;
                    }

                    .print-title {
                        margin: 6px 0 0 0;
                        color: #27ae60;
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .print-date {
                        font-size: 14px;
                        color: #566573;
                        margin-top: 6px;
                        font-weight: 500;
                    }

                    .label {
                        font-weight: bold;
                        color: #34495e;
                        margin-top: 14px;
                        margin-bottom: 6px;
                        font-size: 15px;
                        text-align: left;
                    }

                    .data-value {
                        color: #2c3e50;
                        font-size: 18px;
                        background: #f8f9f9;
                        padding: 14px;
                        border-radius: 8px;
                        border: 1px solid #d5dbdb;
                        word-wrap: break-word;
                        font-weight: 500;
                        text-align: left;
                    }

                    .teacher-info {
                        position: absolute;
                        bottom: 25px;
                        right: 35px;
                        text-align: right;
                        font-size: 13px;
                        color: #566573;
                        line-height: 1.5;
                    }

                    .teacher-name {
                        font-weight: bold;
                        color: #1a5276;
                        font-size: 14px;
                    }

                    .action-buttons {
                        margin-top: 30px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        width: 100%;
                    }

                    .download-btn, .exit-btn {
                        width: 100%;
                        padding: 14px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                        transition: background 0.2s;
                    }

                    .download-btn { background-color: #2ecc71; color: white; }
                    .download-btn:hover { background-color: #27ae60; }
                    .exit-btn { background-color: #e74c3c; color: white; }
                    .exit-btn:hover { background-color: #c0392b; }

                    .moving-text {
                        position: absolute;
                        width: 100%;
                        white-space: nowrap;
                        font-size: 24px;
                        font-weight: bold;
                        color: rgba(26, 82, 118, 0.22);
                        animation: marquee 15s linear infinite;
                        pointer-events: none;
                    }
                    .top-marquee { top: 40px; }
                    .middle-marquee { top: 50%; transform: translateY(-50%); font-size: 32px; color: rgba(26, 82, 118, 0.10); }
                    .bottom-marquee { bottom: 40px; }

                    @keyframes marquee {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }

                    @media (max-width: 480px) {
                        body { padding: 10px; }
                        .result-card {
                            max-width: 520px;
                            padding: 40px;
                            padding-bottom: 100px;
                        }
                        .print-brand { font-size: 28px; }
                        .print-title { font-size: 16px; }
                        .data-value { font-size: 18px; padding: 14px; }
                        .download-btn, .exit-btn { padding: 14px; font-size: 16px; }
                        .teacher-info { bottom: 25px; right: 35px; font-size: 13px; }
                        .teacher-name { font-size: 14px; }
                    }

                    .pdf-mode { background-color: white !important; display: block !important; padding: 0 !important; overflow: visible !important; }
                    .pdf-mode .moving-text { display: none !important; }
                    .pdf-mode .result-card {
                        border: none !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        padding-bottom: 60px !important;
                        max-width: 100% !important;
                    }
                    .pdf-mode .data-value { background: transparent !important; border: none !important; padding-left: 0 !important; }
                    .pdf-mode .teacher-info { bottom: 0 !important; right: 0 !important; }
                </style>

                <script>
                    function generateAndOpenPDF() {
                        const element = document.getElementById('cardContainer');
                        const buttons = document.getElementById('actionButtons');
                        const marquees = document.querySelectorAll('.moving-text');
                        
                        document.body.classList.add('pdf-mode');
                        buttons.style.display = 'none';
                        marquees.forEach(m => m.style.display = 'none');
                        
                        const opt = {
                            margin:       10,
                            filename:     'Result_${nic}.pdf',
                            image:        { type: 'jpeg', quality: 0.98 },
                            html2canvas:  { scale: 2, useCORS: true },
                            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
                        };
                        
                        html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
                            pdf.save('Result_${nic}.pdf');
                            const blobUrl = pdf.output('bloburl');
                            window.location.href = blobUrl; 
                        }).then(() => {
                            document.body.classList.remove('pdf-mode');
                            buttons.style.display = 'flex';
                            marquees.forEach(m => m.style.display = 'block');
                        });
                    }
                </script>
            </head>
            <body>
                <div class="moving-text top-marquee">Information Communication Technology</div>
                <div class="moving-text middle-marquee">Information Communication Technology</div>
                <div class="moving-text bottom-marquee">Information Communication Technology</div>

                <div class="result-card" id="cardContainer">
                    <div class="header-container">
                        <h2 class="print-brand">ICT Class</h2>
                        <h3 class="print-title">மாணவர் பெறுபேற்று அறிக்கை</h3>
                        <div class="print-date">${formattedDate}</div> 
                    </div>
                    
                    <div class="label">N.I.C Number:</div>
                    <div class="data-value">${nic}</div>
                    
                    <div class="label">Name:</div>
                    <div class="data-value">${student.name}</div>
                    
                    <div class="label">Marks:</div>
                    <div class="data-value">${student.result}</div>

                    <div class="teacher-info">
                        <span class="teacher-name">Teacher: Y.M.Nashan</span><br>
                        <span>BICT(Hons) undergraduate</span>
                    </div>

                    <div class="action-buttons" id="actionButtons">
                        <button class="download-btn" onclick="generateAndOpenPDF()">Download PDF</button>
                        <button class="exit-btn" onclick="window.close()">Exit</button>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();

    } else {
        alert("தவறான அடையாள அட்டை எண் அல்லது விபரங்கள் இல்லை!");
    }
                                }
