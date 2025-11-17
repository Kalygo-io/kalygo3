"use client";

import { useState, useEffect } from "react";
import {
  Cog6ToothIcon,
  CreditCardIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { getCurrentUser } from "@/services/getCurrentUser";
import { getPaymentMethods, PaymentMethod } from "@/services/getPaymentMethods";
import { errorReporter } from "@/shared/errorReporter";
import { Spinner } from "@/components/shared/common/spinner";
import { successToast } from "@/shared/toasts";

export function SettingsContainer() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardholderName, setCardholderName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [billingZip, setBillingZip] = useState<string>("");
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setEmail(user.email);
      } catch (err) {
        errorReporter(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const methods = await getPaymentMethods();
        setPaymentMethods(methods);
      } catch (err) {
        errorReporter(err);
      } finally {
        setIsLoadingPaymentMethods(false);
      }
    }
    fetchPaymentMethods();
  }, []);

  const handleDeleteCard = async (paymentMethodId: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) {
      return;
    }
    try {
      // TODO: Implement API call to delete payment method
      console.log("Deleting payment method:", paymentMethodId);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPaymentMethods(
        paymentMethods.filter((pm) => pm.id !== paymentMethodId)
      );
      successToast("Payment method deleted successfully");
    } catch (err) {
      errorReporter(err);
    }
  };

  const getCardBrandIcon = (brand: string) => {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes("visa")) return "💳";
    if (brandLower.includes("mastercard")) return "💳";
    if (brandLower.includes("amex") || brandLower.includes("american")) return "💳";
    if (brandLower.includes("discover")) return "💳";
    return "💳";
  };

  const formatExpiry = (month: number, year: number) => {
    return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCvv(v);
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCard(true);
    try {
      // TODO: Implement API call to save credit card
      console.log("Saving card:", {
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardholderName,
        expiryDate,
        cvv,
        billingZip,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Credit card saved successfully!");
      // Reset form
      setCardNumber("");
      setCardholderName("");
      setExpiryDate("");
      setCvv("");
      setBillingZip("");
      // Refresh payment methods list
      const methods = await getPaymentMethods();
      setPaymentMethods(methods);
    } catch (err) {
      errorReporter(err);
    } finally {
      setIsSavingCard(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Cog6ToothIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Spinner />
                    <span className="text-gray-400 text-sm">Loading...</span>
                  </div>
                ) : (
                  <p className="text-white text-sm font-mono bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700">
                    {email || "Not available"}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Saved Payment Methods */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCardIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Saved Payment Methods
              </h2>
            </div>
            {isLoadingPaymentMethods ? (
              <div className="flex items-center justify-center py-8">
                <Spinner />
                <span className="ml-2 text-gray-400">Loading payment methods...</span>
              </div>
            ) : paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCardIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No saved payment methods</p>
                <p className="text-gray-500 text-sm mt-1">
                  Add a payment method below to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 flex items-center justify-between hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-2xl">
                        {pm.card ? getCardBrandIcon(pm.card.brand) : "💳"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">
                            {pm.card
                              ? `${pm.card.brand.toUpperCase()} •••• ${pm.card.last4}`
                              : "Card"}
                          </span>
                          {pm.isDefault && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs font-medium rounded">
                              <CheckCircleIcon className="w-3 h-3" />
                              <span>Default</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                          {pm.card && (
                            <>
                              <span>
                                Expires {formatExpiry(pm.card.exp_month, pm.card.exp_year)}
                              </span>
                              {pm.billing_details?.name && (
                                <span>• {pm.billing_details.name}</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(pm.id)}
                      className="ml-4 p-2 hover:bg-red-600/20 rounded-lg transition-colors group"
                      title="Delete payment method"
                    >
                      <TrashIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Payment Method */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCardIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Add Payment Method
              </h2>
            </div>
            <form onSubmit={handleSaveCard} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Billing ZIP Code
                </label>
                <input
                  type="text"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value.replace(/\D/g, "").substring(0, 10))}
                  placeholder="12345"
                  maxLength={10}
                  required
                  className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSavingCard}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingCard ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Spinner />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Payment Method"
                )}
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Notifications
                  </label>
                  <p className="text-gray-400 text-sm">
                    Receive email updates about your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

