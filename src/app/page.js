"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Shield,
  Users,
  Stethoscope,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion"; // <-- Add this import

export default function Home() {
  const { toast } = useToast();

  const handleServiceClick = (serviceName) => {
    toast.info(
      `Learn more about our ${serviceName} services. Contact us at +1 (555) 123-4567 for details.`,
      {
        duration: 4000,
      }
    );
  };

  const handleContactClick = (contactType, value) => {
    navigator.clipboard.writeText(value);
    toast.success(`${contactType} copied to clipboard: ${value}`, {
      duration: 3000,
    });
  };
  return (
    <div className="min-h-screen bg-white">
      <nav className="absolute top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Carelink</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>{" "}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-blue-600"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Welcome to Carelink Hospital
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                aliquam enim, eget facilisis quam felis id mauris.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              >
                <Link
                  href="/signup"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors inline-block"
                >
                  Staff Login
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Medical professionals providing healthcare"
                  width={800}
                  height={500}
                  className="w-full h-[500px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-60"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Our <span className="font-bold">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
              aliquam enim, eget facilisis quam felis id mauris.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              onClick={() => handleServiceClick("Emergency Care")}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Shield className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Emergency Care
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                aliquam enim, eget facilisis quam felis id mauris.
              </p>
            </div>

            <div
              onClick={() => handleServiceClick("Advanced Surgery")}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Stethoscope className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Advanced Surgery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                aliquam enim, eget facilisis quam felis id mauris.
              </p>
            </div>

            <div
              onClick={() => handleServiceClick("Pediatric Care")}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Pediatric Care
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                aliquam enim, eget facilisis quam felis id mauris.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                About <span className="font-bold">Carelink</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                  aliquam enim, eget facilisis quam felis id mauris.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                  aliquam enim, eget facilisis quam felis id mauris.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      30+
                    </div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      50k+
                    </div>
                    <div className="text-gray-600">Patients Served</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl h-80 flex items-center justify-center">
                <Heart className="w-24 h-24 text-blue-600/30" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Get In <span className="font-bold">Touch</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
              aliquam enim, eget facilisis quam felis id mauris.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div
                className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                onClick={() =>
                  handleContactClick(
                    "Address",
                    "123 Medical Center Drive, Health City, HC 12345"
                  )
                }
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tokha - 7, Dhapasi
                    <br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div
                className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                onClick={() => handleContactClick("Phone", "+1 (555) 123-4567")}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+977 (986) 629-6119</p>
                </div>
              </div>

              <div
                className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                onClick={() =>
                  handleContactClick("Email", "info@Carelink-hospital.com")
                }
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">info@Carelink-hospital.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Emergency Hours
                  </h3>
                  <p className="text-gray-600">
                    We&apos;re available 24/7 for emergencies
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-gray-600">Emergency Services</span>
                  <span className="font-medium text-blue-600">24/7</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-gray-600">General Consultations</span>
                  <span className="font-medium text-gray-900">
                    8:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Outpatient Services</span>
                  <span className="font-medium text-gray-900">
                    7:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">Carelink</span>
            </div>
            <div className="text-gray-400">
              © 2025 Carelink Hospital. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
