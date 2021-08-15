import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCollapse,
    CRow
} from '@coreui/react';

const Documentation = () => {
    const [accordion, setAccordion] = useState()

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Manuel Documentation
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 0 ? null : 0)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Dashboard</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 0}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>OVERHEAD STATISTICS</strong></i>
                                                <br />
                                                Manuel provides 4 overhead statistics at the top of the <strong>Dashboard</strong> page for immediate access. The “committees” statistics card displays the number of committees currently created for the conference. More committees can be added from the <strong>Committee Roster</strong> page. The “delegations” statistics card displays the number of delegations currently registered for the conference. More delegations and other relevant registration information can be inputted on the <strong>Registration Data</strong> page. The “delegates” statistics card displays the number of delegates currently registered for the conference. This number combines the number of registered delegates of a delegation and independent delegates from the <strong>Registration Data</strong> page. The “income” statistics card displays the total sum of income a conference is expected to make based on the number of registered delegates and delegations accounting for different registration time windows and corresponding registration fees specified in the “Registration Settings” tab of the <strong>Settings</strong> page.
                                                <br />
                                                <br />
                                                <i><strong>COMMITTEE CAPACITY BAR CHART</strong></i>
                                                <br />
                                                The “Committee Capacity” bar chart lists the number of assigned delegates and total positions for each committee of a conference. Hovering over a bar chart element opens a tooltip with a committee, label, and specific number. This allows conference organizers to easily see the distribution of delegates in a conference by committee to ensure that certain committees aren’t overpopulated as well as balance the size of committees according to the size of available committee rooms.
                                                <br />
                                                <br />
                                                <i><strong>CONFERENCE CAPACITY PROGRESS BAR</strong></i>
                                                <br />
                                                The “Conference Capacity” progress bar shows the percentage towards capacity that a conference is currently at. A conference’s capacity is determined by the sum of all assigned positions in each of the committees whereas a conference’s total capacity is determined by the sum of all positions in each of the committees. Ideally, conferences should remain between 75%-90% capacity for optimal debate in committees while allowing for leeway in the event of emergencies and last minute onsite changes.
                                                <br />
                                                <br />
                                                <i><strong>PAYMENT COMPLETION PROGRESS BAR</strong></i>
                                                <br />
                                                The “Payment Completion” progress bar shows the percentage towards completed payments that a conference is currently at. This statistic is determined by the number of payments received divided by the number of payments expected. An important note is that the payment completion statistic does not account for the sum of the invoices but solely the number of invoices that have been paid for.
                                                <br />
                                                <br />
                                                <i><strong>DELEGATION BALANCE PROGRESS BAR</strong></i>
                                                <br />
                                                The “Delegation Balance” progress bar shows the percentage of delegations that are balanced at a conference. A delegation is considered to be balanced when the number of positions specified on the <strong>Committee Allotments</strong> page matches the number of positions assigned for each of the committees. Ideally 100% delegation balance should be achieved by the start of a conference.
                                                <br />
                                                <br />
                                                <i><strong>COMMITTEE SPREAD</strong></i>
                                                <br />
                                                The “Committee Spread” chart displays the spread of committees by committee type, allowing conference organizers to ensure that a variety of different committee types are offered at a conference. A committee’s type can be specified when adding a committee on the <strong>Committee Roster</strong> page.
                                                <br />
                                                <br />
                                                <i><strong>REGISTRATION TIME WINDOW SPREAD</strong></i>
                                                <br />
                                                The “Registration Time Window Spread” chart displays the spread of registrations by the registration time window, allowing conference organizers to see when the majority of registrations are occurring. A delegation’s registration time window can be specified when adding a registration entry on the <strong>Registration Data</strong> page.
                                                <br />
                                                <br />
                                                <i><strong>DELEGATE DISTRIBUTION BY COMMITTEE TYPE PIE CHART</strong></i>
                                                <br />
                                                The “Delegate Distribution by Committee Type” pie chart displays the number of delegates by their respective committee types, allowing conference organizers to easily view committee type popularities and schedule accordingly.
                                                <br />
                                                <br />
                                                <i><strong>DELEGATE DISTRIBUTION BY DELEGATION TYPE PIE CHART</strong></i>
                                                <br />
                                                The “Delegate Distribution by Delegation Type” pie chart displays the number of delegates by their delegation registration types, allowing conference organizers to easily view registration type popularities and plan accordingly.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 1 ? null : 1)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Settings</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 1}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>CONFERENCE SETTINGS</strong></i>
                                                <br />
                                                Conference Settings are required fields in order to populate data onto template files for invoices, receipts, awards, and more. The following conference settings are required fields:
                                                <br />
                                                <ol>
                                                    <li>Conference Name</li>
                                                    <li>Conference Abbreviation</li>
                                                    <li>Conference Organization</li>
                                                    <li>Conference Secretary-General</li>
                                                    <li>Conference Start Date</li>
                                                    <li>Conference End Date</li>
                                                    <li>Conference Address</li>
                                                    <li>Conference Logo</li>
                                                    <li>Conference Website</li>
                                                </ol>
                                                <i><strong>REGISTRATION SETTINGS</strong></i>
                                                <br />
                                                Registration Settings are required fields in order to populate data onto template files for invoices, receipts, awards, and more. The following registration settings are required fields:
                                                <br />
                                                <ol>
                                                    <li>Invoice Address</li>
                                                    <li>Early Registration - Delegate Fee</li>
                                                    <li>Early Registration - Delegation Fee</li>
                                                    <li>Regular Registration - Delegate Fee</li>
                                                    <li>Regular Registration - Delegation Fee</li>
                                                    <li>Late Registration - Delegate Fee</li>
                                                    <li>Late Registration - Delegation Fee</li>
                                                </ol>
                                                <i><strong>AWARD SETTINGS</strong></i>
                                                <br />
                                                Award Settings lists the different types of awards offered at a conference in order to populate award submission fields. Submit one entry of each award type along with its corresponding point value which will be utilized to calculate delegation awards.
                                                <br />
                                                <br />
                                                Previously submitted entries can be edited by selecting <strong>Edit</strong> from the actions dropdown or deleted by selecting <strong>Delete</strong>.
                                                <br />
                                                <br />
                                                <i><strong>MANUEL LICENSE</strong></i>
                                                <br />
                                                Manuel account’s require a license file to unlock full functionality. Manuel implements a tier based structure for conferences to manage expenses dependent on their conference size. Each license type provides conference organizers access to all of Manuel’s features, however the scale in which a conference can operate is dependent on the plan purchased. Plans are sold on an annual term, after which a conference organizer can renew, upgrade, or delete their Manuel account.
                                                <br />
                                                <br />
                                                Once a plan is purchased and processed, the conference organizer will be contacted via email with their Manuel license within 48 hours upon which the organizer can begin utilizing all of the features that Manuel has to offer.
                                                <br />
                                                <br />
                                                To upload a license file, click the <strong>Upload License</strong> button, select your license file, and click <strong>Submit</strong>.
                                                <br />
                                                <br />
                                                Previously submitted entries can be deleted by selecting <strong>Delete</strong> from the actions dropdown.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Registration Documentation
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 2 ? null : 2)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Registration Data</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 2}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>REGISTRATION DATA TABLE</strong></i>
                                                <br />
                                                The “Registration Data” table consolidates all conference registration entries into a single table. It’s filterable headers allow conference organizers to easily sort registration data, and plan accordingly.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>ADDING REGISTRATION ENTRIES</strong></i>
                                                <br />
                                                Above the “Registration Data” table, there is an <strong>Add New</strong> button that allows conference organizers to add an entry to the table. Clicking this button opens a form of all required fields for a registration entry. Multiple contact emails can be submitted by separating individual emails with a comma.
                                                <br />
                                                <br />
                                                <i><strong>REGISTRATION ENTRY ACTIONS</strong></i>
                                                <br />
                                                Previously submitted entries can be edited by selecting <strong>Edit</strong> from the actions dropdown or deleted by selecting <strong>Delete</strong>. Selecting <strong>Details</strong> from the actions dropdown will open a popup with more information about the registration entry.
                                                <br />
                                                <br />
                                                <i><strong>COPYING FULL EMAIL LISTS</strong></i>
                                                <br />
                                                Above the “Registration Data” table, there is a <strong>Full Email List</strong> button that allows conference organizers to easily copy all registration entry emails.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 3 ? null : 3)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Committee Allotments</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 3}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>COMMITTEE ALLOTMENTS TABLE</strong></i>
                                                <br />
                                                The “Committee Allotments” table represents the number of positions a delegation should have in a committee. Conference organizers should use the <strong>Edit</strong> action to indicate the final number of positions a delegation should have in a committee. This number will be cross-referenced with the number of actual assigned positions for each committee to ensure that delegations are receiving the correct number of positions. Any differences will result in overhead alerts appearing on <strong>Position Assignments</strong> pages under individual committees, as well as an unbalanced tag appearing on the <strong>Position Invoicing</strong> page.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>COMMITTEE DETAILS BUTTON</strong></i>
                                                <br />
                                                The “Committee Allotments” table headers list the abbreviations, if applicable, of a conference's committees followed by the number of assigned positions in the committee. This number is provided for conference organizers to ensure that certain committees aren’t overpopulated and balance committees according to the size of available rooms. Each committee abbreviation/name is a clickable button that opens more information regarding the committee.
                                                <br />
                                                <br />
                                                <i><strong>COMMITTEE ALLOTMENT ACTIONS</strong></i>
                                                <br />
                                                Previously submitted entries can be edited by selecting <strong>Edit</strong> from the actions dropdown.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 4 ? null : 4)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Payment Invoicing</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 4}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>PAYMENT INVOICING TABLE</strong></i>
                                                <br />
                                                The “Payment Invoicing” table displays all payment information for a delegation registered at the conference. The status column indicates whether or not a payment has been received from a delegation, and can be toggled between “Paid” or “Unpaid” via the <strong>Reverse Status</strong> option on the actions dropdown. The window column indicates the time window of a registration entry and the delegate fee and invoice total is calculated according to the conference registration settings.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>PAYMENT INVOICING ACTIONS</strong></i>
                                                <br />
                                                A status can be toggled between either “Paid” or “Unpaid” by selecting <strong>Reverse Status</strong> on the actions dropdown. To download a delegation’s payment invoice or payment receipt, select the corresponding item from the actions dropdown.
                                                <br />
                                                <br />
                                                <i><strong>CREATING CUSTOM PAYMENT INVOICES</strong></i>
                                                <br />
                                                Above the “Payment Invoicing” table, there is a <strong>Custom Payment Invoice</strong> button that allows conference organizers to create individual custom payment receipts if needed. Clicking this button opens a form of required data to generate a custom position assignment invoice.
                                                <br />
                                                <br />
                                                <i><strong>CREATING CUSTOM PAYMENT RECEIPTS</strong></i>
                                                <br />
                                                Above the “Payment Invoicing” table, there is a <strong>Custom Payment Receipt</strong> button that allows conference organizers to create individual custom payment receipts if needed. Clicking this button opens a form of required data to generate a custom position assignment invoice.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingFour">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 5 ? null : 5)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Position Invoicing</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 5}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>POSITION INVOICING TABLE</strong></i>
                                                <br />
                                                The “Position Invoicing” table displays the relevant registered delegation data and its position invoicing status. A delegation’s status is determined by the number of allotted positions for each committee, versus the number of assigned positions for each committee a delegation has. Should there be no discrepancies, a delegation is marked as “Balanced” otherwise “Unbalanced”. Specific alerts will appear on individual committee <strong>Position Assignment</strong> pages if adjustments should be made in order to balance a delegation status, ensuring that all delegations receive the proper number of positions in a committee.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>POSITION INVOICING ACTIONS</strong></i>
                                                <br />
                                                To download a delegation’s position invoice, select <strong>Download Position Invoice</strong> from the actions dropdown.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Documentation
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 6 ? null : 6)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Committee Roster</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 6}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>COMMITTEE ROSTER TABLE</strong></i>
                                                <br />
                                                The “Committee Roster” table displays all committees that a conference currently has set up for the conference. Each committee found on the committee roster will generate its own set of subpages, <strong>Position Assignments</strong> and <strong>Individual Awards</strong>, where committee specific actions can be taken. The table additionally gives a quick overview at all committees, displaying the number of assigned positions and total positions.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>COMMITTEE ROSTER ACTIONS</strong></i>
                                                <br />
                                                Previously submitted entries can be edited by selecting <strong>Edit</strong> from the actions dropdown or deleted by selecting <strong>Delete</strong>.
                                                <br />
                                                <br />
                                                <i><strong>ADDING NEW COMMITTEE TO ROSTER</strong></i>
                                                <br />
                                                Above the “Committee Roster” table, there is an <strong>Add New</strong> button that allows conference organizers to add a new committee to their conference committee roster. This will open a form where required data can be inputed. Committee positions can be custom added through the text area and should be separated by a comma, or Manuel’s default list of positions can be imported by the positions needed.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 7 ? null : 7)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Individual Committee - Position Assignments</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 7}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>POSITION ASSIGNMENTS TABLE</strong></i>
                                                <br />
                                                Each individual committee from the <strong>Committee Roster</strong> page generates a corresponding “Position Assignments” table which displays all the positions in a committee in the leftmost column. On the rightmost column, assignment, conference organizers can select a registered delegation to assign the position to.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>TRIGGERED ALERTS</strong></i>
                                                <br />
                                                Above the “Position Assignments” table, triggered alerts will appear for delegations who are not balanced. Delegations are considered balanced when the number of allotted positions in a committee, specified on the <strong>Committee Allotments</strong> page, matches the number of assigned positions on the <strong>Position Assignments</strong> page. For each delegation that is unbalanced, a new alert will appear, indicating how many additional or reduced positions a delegation needs in order to become balanced. An <strong>Auto-Assign</strong> button additionally appears on the alert which, when clicked, automatically assigns or removes random positions until the delegation is balanced.
                                                <br />
                                                <br />
                                                <i><strong>GENERATED DOCUMENTS</strong></i>
                                                <br />
                                                Below the “Position Assignments” table, each committee has a table of Manuel auto-generated files. The first file is a placard set for the committee, formatted using Manuel’s template file. The second file is an attendance sheet which lists all positions in a committee along with their corresponding assignments and empty space to mark a delegation's attendance status. This sheet can be reprinted for each committee session for chair usage.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 8 ? null : 8)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Individual Committee - Individual Awards</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 8}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>INDIVIDUAL AWARDS TABLE</strong></i>
                                                <br />
                                                Each individual committee from the <strong>Committee Roster</strong> page generates a corresponding “Individual Awards” table which displays all the committee awards that have been submitted. The table displays all information that will used in generating committee awards and therefore should be verified to be accurate.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                                <br />
                                                <br />
                                                <i><strong>INDIVIDUAL AWARDS ACTIONS</strong></i>
                                                <br />
                                                Previously submitted entries can be edited by selecting <strong>Edit</strong> from the actions dropdown or deleted by selecting <strong>Delete</strong>.
                                                <br />
                                                <br />
                                                <i><strong>ADDING NEW INDIVIDUAL AWARDS</strong></i>
                                                <br />
                                                Individual awards can be added via the <strong>Add New</strong> button. This opens a form where award information can be submitted. The delegation dropdown automatically updates according to the position that is selected to eliminate accidental errors when filling out the award submission form.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Awards Documentation
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 9 ? null : 9)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Committee Awards</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 9}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>DOWNLOADING AWARDS</strong></i>
                                                <br />
                                                The <strong>Committee Awards</strong> page allows you to download awards submitted on the <strong>Individual Awards</strong> page for each of the committees. Selecting the <strong>Download</strong> button from the download column will open a PDF file containing all of the committee’s awards using Manuel’s prebuilt committee awards template.
                                                <br />
                                                <br />
                                                <i><strong>CREATING CUSTOM AWARDS</strong></i>
                                                <br />
                                                Above the “Committee Awards” table, there is a <strong>Custom Committee Award</strong> button that allows conference organizers to create an individual custom committee award in the event of a reprint or assignment error. Clicking this button opens a form of required data to generate a custom committee award.
                                                <br />
                                                <br />
                                                <i><strong>ADJUSTING TEMPLATE BORDERS</strong></i>
                                                <br />
                                                By default, Manuel template awards leave a margin of ~1.25” on all sides to account for the award being printed onto paper with a border design. If however, the paper borders exceed this margin, awards can be scaled by going to the print menu, selecting <strong>More Settings</strong>, and using the <strong>Scale (%)</strong> to scale awards to the necessary size.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 10 ? null : 10)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Delegation Awards</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 10}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>DELEGATION AWARDS TABLE</strong></i>
                                                <br />
                                                The “Delegation Awards” table calculates a score for every delegation in the event that a conference wants to distribute delegation awards. The leftmost columns list a delegation's name and their division, allowing conference organizers to sort delegations by different delegation award divisions. The next columns list each type of award specified in the award settings on the <strong>Settings</strong> page, along with its corresponding point value, as well as the number of each award that the delegation received. The “Raw Score” of a delegation is calculated by the sum of all of their awards taking into consideration the different point values of each award. The “Per Capita Score” of a delegation is calculated by dividing a delegation’s raw score by the number of delegations/number of assigned positions a delegation has.
                                                <br />
                                                <br />
                                                Should conference organizers filter this data further, to organize this data into more specific categories, Manuel’s export feature is available on this table.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 11 ? null : 11)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Participation Awards</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 11}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>DOWNLOADING AWARDS</strong></i>
                                                <br />
                                                The <strong>Participation Awards</strong> page allows you to download participation awards for delegates at the conference. Two separate tables exist in order to provide multiple options for conference organizers to choose from. The “Participation Awards by Committee” table organizes participation awards by different committees, allowing for easy distribution during committee sessions. The “Participation Awards by Delegation” table organizes participation awards by different delegations, including independent delegates, allowing for easy distribution during check in. Selecting the <strong>Download</strong> button from the download column on either table will open a PDF file containing all of the participation awards using Manuel’s prebuilt participation awards template.
                                                <br />
                                                <br />
                                                <i><strong>CREATING CUSTOM AWARDS</strong></i>
                                                <br />
                                                Above the “Participation Awards by Committee” table and the “Participation Awards by Delegation” table, there is a <strong>Custom Participation Award</strong> button that allows conference organizers to create an individual custom participation award in the event of a reprint or assignment error. Clicking this button opens a form of required data to generate a custom participation award.
                                                <br />
                                                <br />
                                                <i><strong>ADJUSTING TEMPLATE BORDERS</strong></i>
                                                <br />
                                                By default, Manuel template awards leave a margin of ~1.25” on all sides to account for the award being printed onto paper with a border design. If however, the paper borders exceed this margin, awards can be scaled by going to the print menu, selecting <strong>More Settings</strong>, and using the <strong>Scale (%)</strong> to scale awards to the necessary size.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Supplemental Documentation
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 12 ? null : 12)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Export</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 12}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>EXPORTING MANUEL TABLE DATA</strong></i>
                                                <br />
                                                Manuel integrates exporting functionality into specific tables to provide conference organizers with full flexibility with their data should they have a need for it outside of Manuel’s built in features. The following tables have exportable functionality supported which allows conference organizers to download table contents as an Excel/CSV file:
                                                <ol>
                                                    <li>Registration Data from the <strong>Registration Data</strong> page</li>
                                                    <li>Committee Allotments from the <strong>Committee Allotments</strong> page</li>
                                                    <li>Payment Invoicing Data from the <strong>Payment Invoicing</strong> page</li>
                                                    <li>Committee Roster from the <strong>Committee Roster</strong> page</li>
                                                    <li>Position Assignments Table from individual committee position assignments pages</li>
                                                    <li>Individual Awards Table from individual committee individual awards pages</li>
                                                </ol>
                                                This feature can be utilized to generate documents with custom template files and mail merging rather than using the built in Manuel templates.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 13 ? null : 13)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Mail Merge</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 13}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>MAIL MERGING WITH MANUEL EXPORTED DATA</strong></i>
                                                <br />
                                                Microsoft mail merging allows you to create a batch of documents that are personalized for each recipient based on data from an associated Excel/CSV file. Placeholders, or merge fields, tell Microsoft Word or Publisher template files where in the document to include information for the data source.
                                                <br />
                                                <br />
                                                Manuel creators have constructed the following mail merge guide for conference organizers to follow should they want to export their data from Manuel and utilize it in generating their own respective documents with custom template files:
                                                <ol>
                                                    <li>After saving the exported Excel/CSV file to your local computer using the Manuel export button, create your template file using either Microsoft Word or Publisher. </li>
                                                    <li>On the <strong>Mailings</strong> tab click on <strong>Select Recipients</strong>, choose <strong>Use Existing List…</strong>, and on the popup, click on <strong>OK</strong>. </li>
                                                    <li>In your template file, click on where you would like to insert a field from the excel file, and then on the <strong>Mailings</strong> tab, select <strong>Insert Merge Field</strong>, and choose the field you want to insert. </li>
                                                    <li>Repeat the previous step for all the fields you want on your template file. </li>
                                                    <li>Check that the mail merge is successful by clicking on <strong>Preview Results</strong> from the <strong>Mailings</strong> tab. </li>
                                                    <li>On the Mailings tab, select either <strong>Edit Individual Documents</strong> to open your template file with each of the fields populated with data from the specified Excel/CSV file in an editable format, or <strong>Print Documents…</strong> to print the generated file or save it as a PDF. </li>
                                                </ol>
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 14 ? null : 14)}
                                        >
                                            <h5 className="m-0 p-0"><strong>Suggestions</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 14}>
                                        <CCardBody>
                                            <CCol xs="12" md="12">
                                                <i><strong>MANUEL SUGGESTIONS</strong></i>
                                                <br />
                                                Have a recommendation for the Manuel development team? Fill out the <strong>Suggestions</strong> form located on the overhead navigation bar for any issues you may have encountered or future features you want to see implemented.
                                            </CCol>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >
        </>
    )
}

export default Documentation
