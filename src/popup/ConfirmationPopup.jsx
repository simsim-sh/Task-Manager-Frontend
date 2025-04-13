import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

export default function ConfirmationPopup({
  isOpen = false,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", // default, danger, warning, success
}) {
  if (!isOpen) return null;

  // Color schemes based on type
  const colorSchemes = {
    default: {
      icon: null,
      confirm: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      header: "border-blue-100",
    },
    danger: {
      icon: <AlertCircle className="text-red-500" size={24} />,
      confirm: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      header: "border-red-100",
    },
    warning: {
      icon: <AlertCircle className="text-amber-500" size={24} />,
      confirm: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
      header: "border-amber-100",
    },
    success: {
      icon: null,
      confirm: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      header: "border-green-100",
    },
  };

  const scheme = colorSchemes[type] || colorSchemes.default;

  // Animation classes for modal entry
  const modalClasses =
    "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm";

  return (
    <div className={modalClasses}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
        <div className={`px-6 py-4 border-b ${scheme.header}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {scheme.icon}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${scheme.confirm}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Example usage with different styles
function ExampleApp() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState("default");

  const handleAction = () => {
    console.log(`Action confirmed! Type: ${confirmationType}`);
    setShowConfirmation(false);
  };

  const openConfirmation = (type) => {
    setConfirmationType(type);
    setShowConfirmation(true);
  };

  const getConfirmationProps = () => {
    switch (confirmationType) {
      case "danger":
        return {
          title: "Confirm Deletion",
          message:
            "Are you sure you want to delete this item? This action cannot be undone.",
          confirmText: "Delete",
          type: "danger",
        };
      case "warning":
        return {
          title: "Warning",
          message:
            "This action might have unexpected consequences. Do you want to proceed?",
          confirmText: "Proceed",
          type: "warning",
        };
      case "success":
        return {
          title: "Confirm Submission",
          message: "Are you ready to submit your completed form?",
          confirmText: "Submit",
          type: "success",
        };
      default:
        return {
          title: "Confirm Action",
          message: "Are you sure you want to proceed with this action?",
          confirmText: "Confirm",
          type: "default",
        };
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Confirmation Dialog Examples
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => openConfirmation("default")}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Default Confirmation
        </button>

        <button
          onClick={() => openConfirmation("danger")}
          className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Confirmation
        </button>

        <button
          onClick={() => openConfirmation("warning")}
          className="p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Warning Confirmation
        </button>

        <button
          onClick={() => openConfirmation("success")}
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Success Confirmation
        </button>
      </div>

      <ConfirmationPopup
        isOpen={showConfirmation}
        onConfirm={handleAction}
        onCancel={() => setShowConfirmation(false)}
        {...getConfirmationProps()}
      />
    </div>
  );
}
