"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloadPage() {
  const [activeOs, setActiveOs] = useState<"windows" | "mac" | "linux">(
    "windows"
  );

  // Version information
  const versionInfo = {
    version: "1.2.0",
    releaseDate: "May 15, 2025",
    size: {
      windows: "78 MB",
      mac: "82 MB",
      linux: "74 MB",
    },
  };

  // System requirements
  const systemRequirements = {
    windows: [
      "Windows 10 or higher",
      "4GB RAM minimum (8GB recommended)",
      "200MB free disk space",
      "1280 x 768 screen resolution or higher",
    ],
    mac: [
      "macOS 11 (Big Sur) or higher",
      "4GB RAM minimum (8GB recommended)",
      "250MB free disk space",
      "1280 x 768 screen resolution or higher",
    ],
    linux: [
      "Ubuntu 20.04 LTS or equivalent",
      "4GB RAM minimum (8GB recommended)",
      "200MB free disk space",
      "1280 x 768 screen resolution or higher",
    ],
  };

  // OS Icons
  const WindowsIcon = () => (
    <svg
      className="w-6 h-6 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );

  const MacIcon = () => (
    <svg
      className="w-6 h-6 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );

  const LinuxIcon = () => (
    <svg
      className="w-6 h-6 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.117.779.567 1.54 1.182 1.959.267.18.575.309.958.339.493.038.97-.012 1.372-.283.402-.271.696-.737.834-1.45.068-.363.087-.773.058-1.202-.132.003-.262 0-.397-.003-1.04-.006-1.137.623-1.33.787-.605.513-1.092.123-1.17-.57-.063-.697.23-1.577.572-2.342.347-.772.8-1.496 1.295-2.171.657-.89 1.387-1.733 2.028-2.292.645-.559 1.2-.824 1.528-.955.325-.13.562-.277.862-.372.302-.096.607-.036.78.097.184.12.324.32.424.553.104.23.186.577.26.923.076.346.144.715.183.95.043.253.148.578.288.677.14.099.387.056.568-.18.182-.237.256-.603.273-.96.016-.357-.022-.865-.243-1.239-.22-.375-.586-.726-1.095-.912-.5-.103-1.046-.097-1.564.01-.524.111-.983.319-1.423.573-.428.247-.808.552-1.173.916-.371.378-.696.773-.93 1.233-.258.372-.45.85-.65 1.187-.202.337-.388.663-.513.95a6.526 6.526 0 00-.338.852c-.092.288-.153.554-.202.805v.001c-.204 1.126-.202 1.908-.08 2.634.12.725.305 1.335.66 1.887.71 1.105 1.855 1.764 3.225 1.97.68.103 1.438.112 2.213.01.57-.078 1.017-.29 1.367-.706.347-.409.566-.917.6-1.477.032-.57-.097-1.197-.37-1.803-.783-1.73-2.366-2.327-4.54-2.341m6.505 7.36c-.325.26-.69.437-1.07.612-.392.174-.804.264-1.178.384-.375.12-.702.245-.963.38-.262.13-.457.272-.568.422-.224.266-.327.51-.366.76-.04.25-.008.486.046.705a2.81 2.81 0 00.196.53c.074.156.166.318.306.485.126.133.312.235.54.287.229.051.464.054.713.005.239-.046.47-.139.673-.263.214-.133.434-.289.619-.478a6.056 6.056 0 00.704-.81c.126-.188.222-.408.293-.628.071-.22.124-.448.158-.68.037-.287.06-.558.068-.812.008-.255.002-.495-.01-.713-.013-.218-.024-.358-.037-.432-.006-.036-.025-.155-.063-.274a3.24 3.24 0 00-.123-.333 2.21 2.21 0 00-.213-.385c-.096-.144-.205-.26-.325-.353zm-10.91.058v.002c-.407.095-.739.244-1.011.466-.272.222-.487.52-.66.893-.347.742-.273 1.68.238 2.493.319.5.76.876 1.272 1.096.512.222 1.09.284 1.677.232.586-.051 1.236-.238 1.663-.546.433-.31.784-.742.933-1.262.076-.262.109-.564.108-.873 0-.31-.033-.612-.138-.908-.104-.296-.263-.548-.485-.729-.222-.18-.486-.277-.767-.302-.281-.025-.57.009-.832.113-.26.103-.444.25-.628.361-.183.11-.344.174-.5.212-.157.037-.325.043-.488.024-.162-.019-.295-.065-.388-.148-.093-.083-.166-.215-.212-.451-.07-.371.088-.732.329-1.021.24-.29.555-.525.855-.691.074-.04.315-.15.315-.15v-.003c.263-.125.497-.254.73-.368.233-.114.472-.237.701-.399.229-.162.456-.356.648-.596.194-.24.35-.527.395-.846.063-.478-.085-.942-.384-1.278-.3-.337-.74-.552-1.254-.614-.515-.062-1.08.002-1.578.158-.498.156-.933.39-1.281.686-.174.148-.328.315-.455.488-.128.173-.234.35-.318.526a3.56 3.56 0 00-.219.503c-.062.171-.104.339-.126.504-.022.168-.026.33-.016.492.011.161.027.305.065.426.034.127.091.219.17.286.08.065.176.113.302.115.125.002.24-.009.337-.022.097-.013.19-.04.301-.092.11-.051.194-.095.302-.152.108-.055.225-.128.359-.221.134-.093.285-.191.44-.296.156-.106.329-.214.51-.326a2.78 2.78 0 01.57-.266c.183-.064.343-.099.512-.097.169.002.299.021.416.069.117.047.224.109.307.187.083.079.114.152.148.27.033.117.017.267-.027.4l-.002-.001c-.055.134-.153.253-.278.366-.127.112-.278.206-.442.29-.164.085-.378.168-.55.241-.171.073-.403.148-.572.224a7.24 7.24 0 00-.57.266c-.2.108-.384.226-.529.355zm6.878-7.153c-.063-.19-.14-.366-.246-.531a2.11 2.11 0 00-.456-.528 1.57 1.57 0 00-.71-.345c-.29-.061-.61-.039-.91.041-.3.081-.531.215-.747.387-.216.173-.415.333-.59.506-.175.173-.336.345-.485.516-.15.17-.29.322-.416.449-.125.127-.255.272-.358.397-.103.124-.187.23-.258.314-.023.025-.063.084-.112.159-.05.074-.1.15-.14.222-.04.073-.082.158-.126.244-.045.085-.072.16-.093.221-.02.062-.042.143-.06.216-.016.075-.05.144-.05.226l.001.002c-.107.311-.061.597.004.844.065.247.162.456.277.63.117.175.268.348.43.47.16.121.334.234.512.314.177.08.39.143.571.188.183.045.377.077.575.099.197.022.38.04.556.04.177 0 .346-.016.513-.048.166-.031.331-.08.487-.15.156-.07.28-.158.391-.277.11-.12.178-.264.223-.423.045-.159.089-.327.09-.498.001-.17-.034-.34-.151-.475-.118-.135-.34-.203-.483-.311-.143-.108-.308-.34-.375-.563-.05-.17-.05-.379-.018-.518.032-.139.086-.219.153-.312.067-.092.13-.163.212-.247.082-.084.152-.163.237-.248.085-.085.164-.178.247-.266.082-.088.174-.196.252-.287.078-.092.142-.193.214-.297.073-.104.146-.212.198-.328.044-.096.149-.384.149-.384.037-.123.076-.249.104-.366.028-.118.064-.232.081-.35.018-.12.027-.254.024-.372a1.91 1.91 0 00-.062-.477z" />
    </svg>
  );

  // Handler for OS selection
  const handleOsSelect = (os: "windows" | "mac" | "linux") => {
    setActiveOs(os);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 md:py-24 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Header */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-primary-dark)]"
        variants={itemVariants}
      >
        Download APOS Solutions
      </motion.h1>

      {/* Value Reinforcement */}
      <motion.p
        className="text-lg text-[var(--color-gray-600)] text-center mb-12 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        Join thousands of businesses streamlining their operations with our
        powerful and intuitive POS system.
      </motion.p>

      {/* OS Selection Tabs */}
      <motion.div className="flex justify-center mb-8" variants={itemVariants}>
        <div className="inline-flex bg-[var(--color-primary-light)] rounded-lg p-1">
          <motion.button
            onClick={() => handleOsSelect("windows")}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeOs === "windows"
                ? "bg-white text-[var(--color-primary)] shadow-sm"
                : "text-[var(--color-gray-600)] hover:bg-white/50"
            }`}
            whileHover={{ scale: activeOs !== "windows" ? 1.05 : 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <WindowsIcon /> Windows
          </motion.button>
          <motion.button
            onClick={() => handleOsSelect("mac")}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeOs === "mac"
                ? "bg-white text-[var(--color-primary)] shadow-sm"
                : "text-[var(--color-gray-600)] hover:bg-white/50"
            }`}
            whileHover={{ scale: activeOs !== "mac" ? 1.05 : 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <MacIcon /> macOS
          </motion.button>
          <motion.button
            onClick={() => handleOsSelect("linux")}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeOs === "linux"
                ? "bg-white text-[var(--color-primary)] shadow-sm"
                : "text-[var(--color-gray-600)] hover:bg-white/50"
            }`}
            whileHover={{ scale: activeOs !== "linux" ? 1.05 : 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <LinuxIcon /> Linux
          </motion.button>
        </div>
      </motion.div>

      {/* Download Card */}
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-[var(--color-primary-light)]"
        variants={itemVariants}
      >
        <div className="p-8">
          {/* Download Info Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-[var(--color-primary-dark)]">
                {activeOs === "windows" && <WindowsIcon />}
                {activeOs === "mac" && <MacIcon />}
                {activeOs === "linux" && <LinuxIcon />}
                APOS Solutions for{" "}
                {activeOs === "windows"
                  ? "Windows"
                  : activeOs === "mac"
                  ? "macOS"
                  : "Linux"}
              </h2>
              <div className="text-sm text-[var(--color-gray-600)] space-y-1">
                <p>Version: {versionInfo.version}</p>
                <p>Released: {versionInfo.releaseDate}</p>
                <p>Size: {versionInfo.size[activeOs]}</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col items-center">
              <motion.div
                className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center mb-2"
                whileHover={{ scale: 1.05 }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Virus Scanned
              </motion.div>
              <motion.div
                className="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Download
              </motion.div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <motion.a
              // href={`/downloads/apos-${activeOs}-${versionInfo.version}.${
              //   activeOs === "windows"
              //     ? "exe"
              //     : activeOs === "mac"
              //     ? "dmg"
              //     : "AppImage"
              // }`}
              href="#"
              className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-4 px-8 rounded-lg shadow-md text-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Now
            </motion.a>
            <motion.p
              className="text-sm text-[var(--color-gray-600)] mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              By downloading, you agree to our{" "}
              <Link
                href="#"
                className="text-[var(--color-primary)] hover:underline"
              >
                Terms of Service
              </Link>
            </motion.p>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-[var(--color-primary-light)] border-t border-[var(--color-primary-light)]/50 p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-primary-dark)]">
            System Requirements
          </h3>
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeOs}
              className="text-sm text-[var(--color-gray-600)] space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {systemRequirements[activeOs].map((requirement, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg
                    className="w-4 h-4 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {requirement}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Installation Instructions */}
      <motion.div className="max-w-2xl mx-auto mt-10" variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-dark)]">
          Installation Instructions
        </h3>
        <AnimatePresence mode="wait">
          <motion.ol
            key={activeOs}
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.li
              className="flex"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                1
              </span>
              <span className="text-[var(--color-gray-600)]">
                {activeOs === "windows" &&
                  "Download the APOS installer (.exe) file from the button above."}
                {activeOs === "mac" &&
                  "Download the APOS disk image (.dmg) file from the button above."}
                {activeOs === "linux" &&
                  "Download the APOS AppImage file from the button above."}
              </span>
            </motion.li>
            <motion.li
              className="flex"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                2
              </span>
              <span className="text-[var(--color-gray-600)]">
                {activeOs === "windows" &&
                  "Double-click the downloaded file to start the installation wizard."}
                {activeOs === "mac" &&
                  "Double-click the downloaded .dmg file to open it."}
                {activeOs === "linux" &&
                  "Make the AppImage executable by right-clicking it, selecting Properties, and enabling 'Allow executing file as program' in the Permissions tab."}
              </span>
            </motion.li>
            <motion.li
              className="flex"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                3
              </span>
              <span className="text-[var(--color-gray-600)]">
                {activeOs === "windows" &&
                  "Follow the on-screen instructions to complete the installation."}
                {activeOs === "mac" &&
                  "Drag the APOS Solutions icon to the Applications folder."}
                {activeOs === "linux" &&
                  "Double-click the AppImage to run the application."}
              </span>
            </motion.li>
            <motion.li
              className="flex"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                4
              </span>
              <span className="text-[var(--color-gray-600)]">
                Launch APOS Solutions from your desktop shortcut or applications
                folder and begin setup.
              </span>
            </motion.li>
          </motion.ol>
        </AnimatePresence>

        <motion.p
          className="mt-6 text-[var(--color-gray-600)]"
          variants={itemVariants}
        >
          Need help with installation?{" "}
          <Link
            href="/contact"
            className="text-[var(--color-primary)] hover:underline"
          >
            Contact our support team
          </Link>{" "}
          for assistance.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
