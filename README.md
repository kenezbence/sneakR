# SneakR - The Future of Shoe Shopping & Reselling

> [!NOTE]
> For the Hungarian installation guide, go to Documents/SneakR Telepítési Útmutató.pdf
## [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 👋 Introduction

Welcome to SneakR! We're revolutionizing the way people buy, sell, and connect over their passion for footwear. SneakR is a modern, digital platform that seamlessly blends a traditional webshop experience with a vibrant social marketplace. Whether you're hunting for the latest releases, seeking out rare grails, or looking to give your pre-loved sneakers a new life, SneakR is your ultimate destination.

Our community supports the intersection of **fashion, sustainability, and technology**. We're building more than just a platform; we're fostering a space where sneaker enthusiasts can connect, discover, and trade with confidence.

## 🎯 Purpose of the Project

The core mission of SneakR is to offer a contemporary, all-in-one solution for the shoe shopping and sales ecosystem. We cater to:

* **Traditional Webshop Needs:** Providing an efficient and sleek online store for brand-new footwear products.
* **Social Marketplace Dynamics:** Empowering users to become sellers, listing their own shoes for a community of interested buyers.

By creating a transparent, secure, and user-friendly environment, SneakR aims to elevate the online shoe shopping experience. Our goal is to provide an optimal experience for all users – whether they're searching for rare limited-edition shoes or decluttering their own collection.

## ✨ Features

SneakR comes packed with features designed for both buyers and sellers:

* **🛍️ Unified Shopping Experience:**
    * Browse and purchase brand-new shoes directly from our curated collection.
    * Explore a diverse range of pre-owned and resell items listed by community members.
* **👟 Resell Marketplace:**
    * **Easy Product Upload:** Intuitive interface for users to list their sneakers, add descriptions, photos, and set prices.
    * **Seller Profiles:** Manage your listings and track your sales.
* **🔍 Advanced Search & Filtering:**
    * Quickly find specific shoes by brand, size, color, condition, price range, and more.
    * Sort and filter results to narrow down choices.
* **🛒 Seamless Ordering & Checkout:**
    * Secure payment processing.
    * Clear order tracking and history.
* **📦 Order Management:**
    * Tools for sellers to manage incoming orders, shipping, and communication with buyers.
    * Notifications and updates for both buyers and sellers.
* **💬 Community & Interaction (Potential Future Features):**
    * User reviews and ratings.
    * Direct messaging between buyers and sellers.
    * Forums or discussion boards for sneaker enthusiasts.
* **📱 Responsive Design:**
    * Enjoy a seamless experience across desktop, tablet, and mobile devices.

## 🚀 Technologies Used

SneakR is built with a modern tech stack to ensure performance, scalability, and a great user experience:

* **Frontend:** Angular, HTML, CSS, JavaScript 
* **Backend:** Java
* **Database:** MySQL
* **Authentication:** JWT

## ⚙️ Getting Started / Installation

This section provides a detailed, step-by-step guide to set up the SneakR development environment. Please follow each step carefully.
*Note: GUI installer steps are described based on typical workflows. Minor variations might exist depending on your OS version or the installer itself.*

### Prerequisites

Ensure you have the following software. If you are installing them now, use the specified versions or verify compatibility.

* **Operating System:** [*Specify, e.g., Windows 10/11 (64-bit), macOS Monterey (or later)*]
* **MAMP:** Version 5.0.6
* **Java Development Kit (JDK):** Version 17 AND Version 8
* **Apache NetBeans IDE:** Version 12.5
* **WildFly Application Server:** Version 26.1.1.final (WildFly Preview EE 9.1 Distribution)
* **Visual Studio Code (VS Code):** Version 1.99.3 (or latest stable)
* **Node.js:** Version 23.11.0 (or latest LTS version)
* **Angular CLI:** (Installed globally via npm)
* **Git:** (For cloning the repository)

### Installation Steps

#### Phase 1: Clone the Repository

1.  **Open a Terminal/Command Prompt:**
    * On Windows: Search for `cmd` or `PowerShell`.
    * On macOS/Linux: Search for `Terminal`.
2.  **Navigate to your development directory:** Choose a folder where you want to store the project.
    ```bash
    # Example:
    # cd C:\Users\YourUser\Projects
    # or
    # cd ~/Projects
    ```
3.  **Clone the SneakR repository:**
    ```bash
    git clone https://github.com/kenezbence/sneakR
    ```
4.  **Navigate into the cloned project directory:**
    ```bash
    cd sneakR
    ```
    You are now in the root directory of the project.

#### Phase 2: Install MAMP (for Apache & MySQL)

1.  **Download MAMP:**
```
    a.  Open your web browser.
    b.  Go to the [official MAMP download page](https://www.mamp.info/en/downloads/#Windows).
    c.  Locate "MAMP & MAMP PRO 5.0.6" (or the specific version you need).
    d.  Click the download link corresponding to your Operating System.
    e.  Save the installer file to your computer (e.g., your `Downloads` folder).
```
2.  **Install MAMP:**
```
    a.  Go to the folder where you downloaded the MAMP installer.
    b.  Double-click the installer file to begin the installation.
    c.  **Welcome Screen:** Click "Next" (or "Continue" on macOS).
    d.  **Component Selection (Important):**
        i.  You will likely see options for "MAMP" and "MAMP PRO".
        ii. **Uncheck** the box next to "MAMP PRO" as it is not required for this project.
        iii. Ensure "MAMP" is checked.
        iv. Click "Next".
    e.  **License Agreement:**
        i.  Read the license agreement.
        ii. If you agree, select the option to accept the terms (e.g., check a box or click "Agree").
        iii. Click "Next".
    f.  **Installation Location:**
        i.  Choose the destination folder for the MAMP installation. The default location is usually suitable.
        ii. Click "Next".
    g.  **Ready to Install:** Click "Install".
    h.  The installation process will begin. Wait for it to complete.
    i.  **Installation Complete:** Click "Finish".
```
3.  **Start MAMP and Servers:**
```
    a.  Find the MAMP application (e.g., on your Desktop, Start Menu, or Applications folder).
    b.  Launch MAMP. The MAMP control panel window will appear.
    c.  MAMP may attempt to start servers automatically. If not, click the "Start Servers" button, or individually start "Apache Server" and "MySQL Server".
    d.  Ensure both Apache and MySQL servers show a green status indicator, meaning they are running.
    e.  **(Verification - Optional)** Access phpMyAdmin:
        i.  Open your web browser.
        ii. Go to `http://localhost/phpMyAdmin`.
        iii.You should see the phpMyAdmin interface if MySQL is running.
```
#### Phase 3: Install JDKs, NetBeans, and WildFly

**3.1. Install Java Development Kits (JDKs)**

You need **both** JDK 17 and JDK 8.

* **For JDK 17:**
    1.  **Download JDK 17:**
```
        a.  Open your browser and go to the [Oracle JDK 17 Archive Downloads page](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
        b.  Accept the license agreement if prompted.
        c.  Find the JDK 17 installer for your operating system (e.g., Windows x64 Installer, macOS Arm 64/x64 DMG Installer).
        d.  Download the installer.
    2.  **Install JDK 17:**
        a.  Run the downloaded JDK 17 installer.
        b.  Follow the on-screen prompts. Default settings are usually fine. Click "Next" through the steps.
        c.  Note the installation path if you need it later (though NetBeans often finds it).
        d.  Complete the installation.
```
* **For JDK 8:**
    1.  **Download JDK 8:**
```
        a.  Open your browser and go to the [Oracle Java SE 8 Archive Downloads page](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html). (You might need an Oracle account for older versions).
        b.  Find the JDK 8 installer for your operating system (e.g., `jdk-8uXXX-windows-x64.exe` or `jdk-8uXXX-macosx-x64.dmg`).
        c.  Download the installer.
    2.  **Install JDK 8:**
        a.  Run the downloaded JDK 8 installer.
        b.  Follow the on-screen prompts. Default settings are usually fine.
        c.  Complete the installation.
```
**3.2. Install Apache NetBeans IDE (Version 12.5)**

1.  **Download NetBeans 12.5:**
```
    a.  Open your browser and go to the [Apache NetBeans 12.5 download page](https://netbeans.apache.org/front/main/download/nb125/nb125/).
    b.  Under the "Installers" section, click the link for your operating system (e.g., `Apache-NetBeans-12.5-bin-windows-x64.exe`).
    c.  Download the installer.
```
2.  **Install NetBeans 12.5:**
```
    a.  Run the downloaded NetBeans installer.
    b.  **Welcome/Customize Screen:**
        i.  You may see a "Customize" button. Click it.
        ii. Ensure that "Java SE", "Java EE" (or "Jakarta EE"), and "HTML5/JavaScript" are selected. WildFly support often comes with Java EE.
        iii. Click "OK" or "Next".
    c.  **License Agreement:** Accept the terms and click "Next".
    d.  **Installation Folder & JDK:**
        i.  Choose the installation folder for NetBeans.
        ii. NetBeans should automatically detect one of your installed JDKs (e.g., JDK 17). If not, browse to its location.
        iii. Click "Next".
    e.  **Summary/Ready to Install:** Click "Install".
    f.  Wait for the installation to complete, then click "Finish".
```
**3.3. Install WildFly Application Server (Version 26.1.1.final)**

1.  **Download WildFly 26.1.1.final:**
```
    a.  Open your browser and go to the [WildFly downloads page](https://www.wildfly.org/downloads/).
    b.  Scroll or search for version **26.1.1.final**.
    c.  Find the "WildFly Preview EE 9.1 Distribution" (this should be `wildfly-preview-26.1.1.Final.zip`).
    d.  Click the "ZIP" button to download it.
```
2.  **Extract WildFly:**
```
    a.  Once downloaded, go to the location of the `wildfly-preview-26.1.1.Final.zip` file.
    b.  Extract the contents of the ZIP file to a suitable directory on your computer.
        * **Example:** `C:\dev\wildfly-26.1.1.Final` or `~/dev/wildfly-26.1.1.Final`.
        * Avoid paths with spaces if possible.
        * This location will be referred to as `<WILDFLY_HOME>`.
```
**3.4. Integrate WildFly with NetBeans**
```
1.  **Launch NetBeans IDE.**
2.  **Open the "Services" Tab:**
    * If not visible, go to the menu: `Window` > `Services` (or press `Ctrl+5`).
3.  **Add WildFly Server:**
    a.  In the "Services" tab, expand the "Servers" node (if it exists) or right-click on "Servers".
    b.  Select "Add Server...".
    c.  In the "Add Server Instance" wizard:
        i.  Under "Choose Server", select "WildFly Application Server". (If not visible, you might need to install a plugin via Tools > Plugins, but it's usually included with Java EE support).
        ii. Click "Next".
    d.  **Server Location:**
        i.  For "Server Location", click "Browse..." and navigate to the directory where you extracted WildFly (your `<WILDFLY_HOME>`, e.g., `C:\dev\wildfly-26.1.1.Final`).
        ii. Click "Open" or "Select".
        iii. Click "Next".
    e.  **Domain and Configuration (Server Details):**
        i.  The "Server Configuration" should default to `standalone.xml` or `standalone-full.xml`. `standalone.xml` is usually fine for development.
        ii. You can leave other settings (like port numbers) at their defaults unless you have specific conflicts.
        iii. Click "Finish".
    f.  WildFly should now appear under the "Servers" node in the "Services" tab.
```
**3.5. Create WildFly Management User**
```
This user is for accessing the WildFly admin console and for NetBeans to manage the server.
1.  **Open a Terminal/Command Prompt.**
2.  **Navigate to WildFly's `bin` directory:**
    ```bash
    cd <WILDFLY_HOME>/bin
    # Example: cd C:\dev\wildfly-26.1.1.Final\bin
    ```
3.  **Run the `add-user` script:**
    * On Windows: `add-user.bat`
    * On macOS/Linux: `sh add-user.sh`
4.  **Follow the prompts:**

    a.  `What type of user do you wish to add?`
        * Type `a` (for Management User) and press `Enter`.
    b.  `Username :`
        * Enter a username (e.g., `admin` or `sneakr_admin`) and press `Enter`. **Remember this username.**
    c.  `Password :`
        * Enter a password. **Remember this password.** (It won't be displayed as you type). Press `Enter`.
    d.  `Re-enter Password :`
        * Enter the same password again and press `Enter`.
    e.  `What groups do you want this user to belong to? (Please enter a comma separated list, or leave blank for none)[  ] :`
        * You can leave this blank and press `Enter` for a simple admin user.
    f.  `About to add user 'your_username' for realm 'ManagementRealm'`
        * `Is this correct yes/no?` Type `yes` and press `Enter`.
    g.  `Added user 'your_username'`
    h.  `Is this new user going to be used for one AS process to connect to another AS process e.g. for a slave Host Controller connecting to a master Domain Controller?`
        * `yes/no?` Type `no` and press `Enter`.
    i.  The script will finish. You have now created a WildFly management user.
```

#### Phase 4: Install Visual Studio Code (VS Code)
```
1.  **Download VS Code:**
    a.  Open your browser and go to the [official VS Code download page](https://code.visualstudio.com/download).
    b.  The website should automatically detect your OS. Click the download button for the "Stable Build" (e.g., Windows User Installer, macOS Universal, Linux .deb/.rpm).
    c.  (User mentioned version 1.99.3; typically, the latest stable is recommended).
2.  **Install VS Code:**
    a.  Run the downloaded VS Code installer.
    b.  **License Agreement:** Accept the agreement and click "Next".
    c.  **Select Destination Location:** Choose the installation folder (default is fine) and click "Next".
    d.  **Select Start Menu Folder:** Choose if/where to create a Start Menu folder and click "Next".
    e.  **Select Additional Tasks (Important):**
        i.  Consider checking:
            * "Add to PATH (requires shell restart)" - **Highly Recommended**.
            * "Register Code as an editor for supported file types".
            * "Add 'Open with Code' action to Windows Explorer file context menu".
            * "Add 'Open with Code' action to Windows Explorer directory context menu".
        ii. Click "Next".
    f.  **Ready to Install:** Click "Install".
    g.  Wait for the installation to complete.
    h.  **Completing Setup:** Click "Finish". VS Code might launch automatically.
```
#### Phase 5: Install Node.js and Angular CLI
```
1.  **Install Node.js (includes npm):**
    a.  **Download Node.js:**
        i.  Open your browser and go to the [Node.js official website](https://nodejs.org/en/download).
        ii. Download the installer for your OS. v23.11.0. Choose the version you require.
    b.  **Install Node.js:**
        i.  Run the downloaded Node.js installer.
        ii. Click "Next" on the Welcome screen.
        iii. Accept the license agreement and click "Next".
        iv. Choose the destination folder (default is fine) and click "Next".
        v.  On the "Custom Setup" screen, ensure all components (especially "npm package manager" and "Add to PATH") are selected. Click "Next".
        vi. On the "Tools for Native Modules" screen, you can choose to install Chocolatey and Python/Visual Studio Build Tools if you plan to work with native Node.js modules. For a standard Angular setup, this is often not immediately necessary. You can leave it unchecked. Click "Next".
        vii.Click "Install".
        viii.Click "Finish" when done.
    c.  **Verify Node.js and npm Installation:**
        i.  Open a **new** Terminal/Command Prompt (important if "Add to PATH" was selected, as existing terminals might not have the updated PATH).
        ii. Type `node -v` and press `Enter`. It should display the Node.js version.
        iii.Type `npm -v` and press `Enter`. It should display the npm version.
2.  **Install Angular CLI (Command Line Interface):**
    a.  Open a Terminal/Command Prompt (if not already open).
    b.  Run the following command to install Angular CLI globally on your system:
        ```bash
        npm install -g @angular/cli
        ```
        *(You might need administrator/sudo privileges for global installs depending on your OS and npm configuration).*
    c.  Wait for the installation to complete.
    d.  **Verify Angular CLI Installation:**
        ```bash
        ng version
        ```
        This command should display information about your Angular CLI version, Node.js version, OS, and other details.
```
#### Phase 6: Project Setup (Frontend - Angular)
```
1.  **Open Project in VS Code:**
    a.  Launch Visual Studio Code.
    b.  Go to `File` > `Open Folder...`.
    c.  Navigate to and select the main `sneakR` project folder that you cloned. Click "Select Folder".
2.  **Navigate to Frontend Directory in VS Code Terminal:**
    a.  Open the integrated terminal in VS Code: `View` > `Terminal` (or `Ctrl+`` `).
    b.  In the terminal, navigate to your Angular project's directory:
        ```bash
        cd frontend
        ```
3.  **Install Frontend Project Dependencies:**
    a.  Once inside the correct Angular project directory (where `package.json` is located), run:
        ```bash
        npm install
        ```
    b.  This command reads the `package.json` file and downloads all the necessary libraries and dependencies for the Angular frontend. Wait for it to complete.
```
#### Phase 7: Project Setup (Backend - Java/WildFly)
```
1.  **Open Backend Project in NetBeans:**
    a.  Launch NetBeans IDE.
    b.  Go to `File` > `Open Project...`.
    c.  Navigate to the directory within your `sneakR` repository that contains your Java backend project (e.g., `sneakR/backend-java-app` or similar).
    d.  Select the project folder (it should be recognized by NetBeans, e.g., showing a coffee cup icon if it's a Maven/Gradle project).
    e.  Click "Open Project".
2.  **Build the Backend Project:**
    d.  **If standard NetBeans project:**
        i.  Right-click on the project.
        ii. Select `Build` or `Clean and Build`.
    e.  **Expected Outcome:** This step should compile your Java code and package it into a `.war` (Web Application ARchive) file. Note the name and location of this `.war` file (e.g., `target/sneakR-backend.war` or `build/libs/sneakR-backend.war`).
3.  **Deploy the `.war` file to WildFly:**
    d.  **Option 3: Using WildFly Management Console:**
        i.  Ensure WildFly is running. Open `http://localhost:9990` in your browser.
        ii. Log in with the management user created in Phase 3.5.
        iii.Navigate to the "Deployments" section.
        iv. Click "Add" or "Upload Deployment", and upload your `.war` file.
```
#### Phase 8: Database Setup (Using MAMP's MySQL)
```
1.  **Ensure MAMP Servers are Running:**
    a.  Open the MAMP control panel.
    b.  Verify that both "Apache Server" and "MySQL Server" have green status indicators.
2.  **Access phpMyAdmin:**
    a.  Open your web browser.
    b.  Navigate to `http://localhost/phpMyAdmin`.
3.  **Create the Database:**
    b.  In phpMyAdmin, click on the "Databases" tab (or "New" in the left panel).
    c.  In the "Create database" field, enter the required database name (e.g., `sneakr`).
    d.  Choose a collation (e.g., `utf8mb4_general_ci` is often a good choice for general use).
    e.  Click "Create".
4.  **Create Database Tables and Populate Initial Data (if any):**
    b.  **Option 1: Using SQL script files:**
        i.In phpMyAdmin, select your newly created database (e.g., `sneakr`) from the left panel.
        ii. Click on the "Import" tab.
        iii.  Under "File to import", click "Browse..." and locate your `sneakr.sql` file. Click "Open".
        iv. Ensure the character set is correct (e.g., UTF-8).
        v.Click "Go" (or "Import") at the bottom of the page.
```
#### Phase 9: Environment Variables & Configuration
```
* **Backend (Java/WildFly) Configuration:**
```    1.  **Database Connection:**
        b.  **If WildFly Datasource (Recommended for Java EE):**
            i.  You need to configure a datasource in WildFly's `standalone/configuration/standalone.xml` (or the profile you use, e.g., `standalone-full.xml`).
            ii. XML snippet for the datasource.
                ```xml
                <datasource jndi-name="java:jboss/datasources/SneakRDS" pool-name="SneakRDS">
                    <connection-url>jdbc:mysql://localhost:3306/sneakr?useSSL=false&amp;serverTimezone=UTC</connection-url>
                    <driver>mysql</driver> <security>
                        <user-name>root</user-name> <password>root</password> </security>
                </datasource>
                <drivers>
                    <driver name="mysql" module="com.mysql">
                        <driver-class>com.mysql.cj.jdbc.Driver</driver-class>
                    </driver>
                </drivers>
```
```
        c.  **If `persistence.xml` (for JPA):**
            i.  Locate `src/main/resources/META-INF/persistence.xml` in your backend project.
            ii. Properties to configure.
                ```xml
                <properties>
                    <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/sneakr_db?useSSL=false&amp;serverTimezone=UTC"/>
                    <property name="javax.persistence.jdbc.user" value="root"/> <property name="javax.persistence.jdbc.password" value="root"/> <property name="javax.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver"/>
                    <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLDialect"/>
                    <property name="hibernate.hbm2ddl.auto" value="update"/> </properties>
                ```
```
### Launching the Application (Putting It All Together)
```
1.  **Step 1: Start MAMP Servers (if not already running):**
    a.  Open the MAMP control panel.
    b.  Ensure "Apache Server" and "MySQL Server" have green status indicators. Click their "Start" buttons if they are stopped.
2.  **Step 2: Start WildFly Application Server (if not already running):**
    a.  **Option A: From NetBeans IDE:**
        i.  Open NetBeans.
        ii. Go to the "Services" tab.
        iii.Right-click on your configured WildFly server (e.g., "WildFly Application Server").
        iv. Select "Start".
        v.  Monitor the "Output" window in NetBeans for WildFly's startup logs and for your backend application's deployment status.
    b.  **Option B: From Command Line:**
        i.  Open a new Terminal/Command Prompt.
        ii. Navigate to WildFly's `bin` directory: `cd <WILDFLY_HOME>/bin`
        iii.Run:
            * Windows: `standalone.bat`
            * macOS/Linux: `sh standalone.sh`
        iv. Monitor the console output for startup and deployment messages. Look for lines indicating your `.war` file has been deployed.
    c.  **Verification:** Once WildFly is running and your app is deployed, you should be able to access the WildFly Management Console at `http://localhost:9990` (log in with the user from Phase 3.5). Your backend application might also have a root context or health check endpoint you can test. [*Specify if there's a backend health check URL, e.g., `http://localhost:8080/sneakR-backend/health`*]
3.  **Step 3: Run the Angular Frontend Application:**
    a.  Open Visual Studio Code.
    b.  Ensure your `sneakR` project folder is open.
    c.  Open the integrated terminal (`View` > `Terminal` or `Ctrl+`` `).
    d.  Navigate into your Angular project's directory in the terminal (e.g., `cd frontend` - [*Adjust path if needed*]).
    e.  Execute the Angular development server command:
        ```bash
        ng serve -o
        ```
        * `ng serve` compiles the Angular application and starts a local development server.
        * The `-o` flag automatically opens the application in your default web browser.
4.  **Step 4: Access and Use the Application:**
    a.  **Frontend:** Your web browser should have opened to `http://localhost:4200` (this is the default port for Angular CLI's `ng serve`). If not, manually navigate to this URL.
    b.  **Backend API Interaction:** The frontend will make requests to the backend API URL configured in `environment.ts`.
    c.  You should now be able to register, log in, and use the SneakR application features.
```
## 📖 Usage

Once the application is running:

1.  **Register/Login:** Create an account or log in if you already have one.
2.  **Browse Products:** Explore the main shop for new sneakers.
3.  **Explore Resell Market:** Check out listings from other users.
4.  **List Your Sneakers:** If you want to sell, navigate to the "Sell" or "My Listings" section to upload your shoes.
5.  **Search & Filter:** Use the search bar and filters to find specific items.
6.  **Manage Orders:** Track your purchases and sales in your dashboard.


## 🗺️ Project Roadmap / Future Enhancements

We have exciting plans for SneakR! Here are some features and improvements we're looking to implement:

* [ ] **Enhanced User Profiles:** More customization and social features.
* [ ] **Direct Messaging System:** For seamless buyer-seller communication.
* [ ] **Mobile Apps:** Native iOS and Android applications.
* [ ] **Advanced Analytics for Sellers:** Insights into their sales performance.
* [ ] **AI-Powered Recommendations:** Personalized suggestions for users.
* [ ] **Sustainability Features:** Highlighting eco-friendly brands or facilitating shoe recycling programs.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
