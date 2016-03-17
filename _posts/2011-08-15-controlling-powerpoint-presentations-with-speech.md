---
title: "Controlling PowerPoint Presentations with Speech"
date:   2011-08-15 23:22:00 +05:30
---
{% include image.html src="/images/ppt_viewer.png" align="center" caption="Screenshot of the PowerPoint Viewer programmed by me" %}

Today morning, I found an article on MSDN about the [Speech Recognition API][speech-api] in .net. Using this API we can implement speech recognition in our applications with a few lines of code. Actually this API uses built in speech recognition engines on Windows Vista and Windows 7. For XP users there is one that comes with Microsoft Office 2003, we have to install that or any other compatible speech recognition engines for using the speech API.

After reading that article, i thought of implementing a PowerPoint viewer that can recognize speech, as there is a seminar in this (7th) semester of B.TECH as the part of the course and for that we all need a PowerPoint presentation. That’s where i got this idea of implementing a speech controlled PowerPoint Viewer. Even though it’s possible in Microsoft Office PowerPoint, i decided to program the same just to learn about that speech API. With the help of this speech API and Microsoft PowerPoint Object library, i programmed my own speech controlled PowerPoint viewer with in an hour in my favorite programming language C Sharp. My program recognizes two commands; on saying "next slide" it goes to next slide and on saying "previous slide" it goes one slide back.

The main part of the C# code :

```csharp

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Speech.Recognition;
using PowerPoint = Microsoft.Office.Interop.PowerPoint;
using Microsoft.Office.Core;

namespace PPT_Viewer
{
    public partial class MainForm : Form
    {
        SpeechRecognizer recognizer;
        PowerPoint.Application oPPT;
        PowerPoint.Presentations objPresSet;
        PowerPoint.Presentation objPres;

        bool showRunning = false;

        public MainForm()
        {
            InitializeComponent();

            oPPT = new PowerPoint.ApplicationClass();
            oPPT.Visible = MsoTriState.msoTrue;
            oPPT.WindowState = PowerPoint.PpWindowState.ppWindowMinimized;
            objPresSet = oPPT.Presentations;
            oPPT.SlideShowEnd +=
                new PowerPoint.EApplication_SlideShowEndEventHandler(
                    oPPT_SlideShowEnd);
        }

        private void oPPT_SlideShowEnd(PowerPoint.Presentation Pres)
        {
            showRunning = false;
            objPres.Close();
            this.WindowState = FormWindowState.Normal;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            recognizer = new SpeechRecognizer();
            Choices actions = new Choices();
            actions.Add("next slide");
            actions.Add("previous slide");
            GrammarBuilder gb = new GrammarBuilder();
            gb.Append(actions);
            Grammar g = new Grammar(gb);
            recognizer.LoadGrammar(g);
            recognizer.SpeechRecognized +=
                new EventHandler&lt;SpeechRecognizedEventArgs&gt;(
                    recognizer_SpeechRecognized);
        }

        void recognizer_SpeechRecognized(object sender,
            SpeechRecognizedEventArgs e)
        {
            if (!showRunning)
                return;

            string command = e.Result.Text;
            switch (command)
            {
                case "next slide":
                    objPres.SlideShowWindow.View.Next();
                    break;
                case "previous slide":
                    objPres.SlideShowWindow.View.Previous();
                    break;
                default:
                    MessageBox.Show("Unidentified command : " + command,
                        "PPT Viewer", MessageBoxButtons.OK,
                        MessageBoxIcon.Information); ;
                    break;
            }
        }

        private void btnPPTBrowse_Click(object sender, EventArgs e)
        {
            OpenFileDialog dlgOpen = new OpenFileDialog();
            dlgOpen.Filter =
                "All PowerPoint Presentations (*ppt;*.pptx)|*.ppt;*.pptx";
            if (dlgOpen.ShowDialog() == DialogResult.OK)
                txtPPTFile.Text = dlgOpen.FileName;
        }

        private void btnStartPPT_Click(object sender, EventArgs e)
        {
            if (txtPPTFile.Text.Equals(""))
            {
                MessageBox.Show("No PowerPoint file selected",
                    "PPT Viewer", MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
            else
            {
                objPres = objPresSet.Open(txtPPTFile.Text,
                    MsoTriState.msoFalse, MsoTriState.msoTrue,
                    MsoTriState.msoTrue);
                objPres.SlideShowSettings.Run();
                this.WindowState = FormWindowState.Minimized;
                showRunning = true;
            }
        }

        private void MainForm_FormClosed(object sender,
            FormClosedEventArgs e)
        {
            objPres = null;
            objPresSet = null;

            GC.Collect();
            GC.WaitForPendingFinalizers();

            oPPT.Quit();
        }
    }
}

```

**Note** : This is only the code of the main form (i don’t think other parts of the code are needed as they are automatically added by Visual Studio) in the application. You need to add System.Speech(.NET) and Microsoft PowerPoint Object library(COM) as reference in order to use the above code.

[speech-api]: http://msdn.microsoft.com/en-us/library/ff394922.aspx
