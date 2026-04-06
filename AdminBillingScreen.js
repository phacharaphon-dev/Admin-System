import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminBillingScreen({ setView }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");

  // 🌟 ข้อมูลจำลองสำหรับสลิปที่รออนุมัติ
  const pendingSlips = [
    {
      id: "STUD-202401",
      amount: "฿ 12,500.00",
      datetime: "24 ต.ค. 2566 • 14:22",
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=200&q=80",
    },
    {
      id: "STUD-202405",
      amount: "฿ 8,900.00",
      datetime: "24 ต.ค. 2566 • 15:05",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80",
    },
    {
      id: "STUD-202412",
      amount: "฿ 45,000.00",
      datetime: "24 ต.ค. 2566 • 16:40",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
    },
  ];

  // 🌟 ข้อมูลจำลองสำหรับตารางบิล
  const billingRecords = [
    {
      id: "STUD-202401",
      amount: "฿ 12,500.00",
      method: "โอนเงินธนาคาร",
      icon: "account-balance",
      date: "24 ต.ค. 2566",
      status: "ยืนยันแล้ว",
      statusBg: "#ffd9df", // primary-container
      statusColor: "#704b4c",
      canPrint: true,
    },
    {
      id: "STUD-202422",
      amount: "฿ 5,200.00",
      method: "บัตรเครดิต",
      icon: "credit-card",
      date: "23 ต.ค. 2566",
      status: "รอดำเนินการ",
      statusBg: "#eae0e2", // surface-container
      statusColor: "#514345",
      canPrint: false,
    },
    {
      id: "STUD-202398",
      amount: "฿ 28,000.00",
      method: "โอนเงินธนาคาร",
      icon: "account-balance",
      date: "22 ต.ค. 2566",
      status: "ยืนยันแล้ว",
      statusBg: "#ffd9df",
      statusColor: "#704b4c",
      canPrint: true,
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="menu" size={28} color="#7b5455" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>การชำระเงิน</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.profilePic}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Pending Verification Section --- */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>ตรวจสอบสลิป</Text>
                <Text style={styles.sectionSubtitle}>รายการโอนเงินที่รอการอนุมัติ</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>ดูทั้งหมด (12)</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.slipScroll}>
              {pendingSlips.map((slip, index) => (
                <View key={index} style={styles.slipCard}>
                  <View style={styles.slipImgContainer}>
                    <Image source={{ uri: slip.image }} style={styles.slipImg} />
                    <View style={styles.slipImgOverlay}>
                      <MaterialIcons name="zoom-in" size={24} color="#ffffff" />
                    </View>
                  </View>
                  <View style={styles.slipInfo}>
                    <Text style={styles.slipId}>{slip.id}</Text>
                    <Text style={styles.slipAmount}>{slip.amount}</Text>
                    <Text style={styles.slipDate}>{slip.datetime}</Text>
                    
                    <View style={styles.slipActions}>
                      <TouchableOpacity style={styles.approveBtn} activeOpacity={0.8}>
                        <LinearGradient colors={["#7b5455", "#a73355"]} style={styles.approveGradient}>
                          <Text style={styles.approveText}>อนุมัติ</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rejectBtn} activeOpacity={0.8}>
                        <Text style={styles.rejectText}>ปฏิเสธ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* --- Billing Table Section (Mobile Card View) --- */}
          <View style={[styles.section, { marginBottom: 60 }]}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>ตารางบิล (Billing)</Text>
            
            {/* Filters */}
            <View style={styles.filterTabs}>
              {["ทั้งหมด", "สำเร็จ", "ล้มเหลว"].map((tab) => (
                <TouchableOpacity 
                  key={tab} 
                  style={[styles.tab, activeFilter === tab && styles.tabActive]}
                  onPress={() => setActiveFilter(tab)}
                >
                  <Text style={[styles.tabText, activeFilter === tab && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
              <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#837375" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="ค้นหาด้วยรหัสนักเรียน..."
                  placeholderTextColor="#837375"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity style={styles.filterIconButton}>
                <MaterialIcons name="filter-list" size={24} color="#1f1a1c" />
              </TouchableOpacity>
            </View>

            {/* Billing List */}
            <View style={styles.billingList}>
              {billingRecords.map((bill, index) => (
                <View key={index} style={styles.billingCard}>
                  <View style={styles.billHeader}>
                    <Text style={styles.billId}>{bill.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: bill.statusBg }]}>
                      <Text style={[styles.statusText, { color: bill.statusColor }]}>{bill.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.billBody}>
                    <Text style={styles.billAmount}>{bill.amount}</Text>
                    <View style={styles.billMethodRow}>
                      <MaterialIcons name={bill.icon} size={18} color="#7b5455" />
                      <Text style={styles.billMethod}>{bill.method}</Text>
                      <Text style={styles.billDate}> •  {bill.date}</Text>
                    </View>
                  </View>

                  <View style={styles.billFooter}>
                    {bill.canPrint ? (
                      <TouchableOpacity style={styles.printBtn} activeOpacity={0.8}>
                        <LinearGradient colors={["#7b5455", "#a73355"]} style={styles.printGradient}>
                          <Text style={styles.printText}>ออกใบเสร็จ</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.printBtnDisabled}>
                        <Text style={styles.printTextDisabled}>ออกใบเสร็จ</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>

        {/* --- Floating Action Button (FAB) --- */}
        <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9}>
          <LinearGradient
            colors={["#7b5455", "#a73355"]}
            style={styles.fabGradient}
          >
            <MaterialIcons name="add" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* --- Bottom Navigation --- */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("DASHBOARD")}>
            <MaterialIcons name="dashboard" size={24} color="#837375" />
            <Text style={styles.navText}>หลัก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("COURSE")}>
            <MaterialIcons name="auto-stories" size={24} color="#837375" />
            <Text style={styles.navText}>วิชา</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("USER")}>
            <MaterialIcons name="group" size={24} color="#837375" />
            <Text style={styles.navText}>ผู้ใช้</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemActive}>
            <MaterialIcons name="payments" size={24} color="#a73355" />
            <Text style={styles.navTextActive}>จ่าย</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="settings" size={24} color="#837375" />
            <Text style={styles.navText}>ตั้งค่า</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F8" },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 224, 226, 0.5)",
    backgroundColor: "#FFF8F8"
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconButton: { padding: 4, borderRadius: 20 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#7b5455" },
  profilePic: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(167, 51, 85, 0.2)" },
  
  scrollContent: { padding: 20, paddingBottom: 120 },

  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "900", color: "#1f1a1c" },
  sectionSubtitle: { fontSize: 12, color: "#514345", marginTop: 2 },
  seeAllText: { fontSize: 12, fontWeight: "bold", color: "#a73355" },

  slipScroll: { overflow: "visible" },
  slipCard: { 
    flexDirection: "row", 
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    padding: 12, 
    borderRadius: 16, 
    marginRight: 16,
    width: 280,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.3)",
    elevation: 2,
    shadowColor: "#a73355", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4
  },
  slipImgContainer: { width: 70, height: 90, borderRadius: 12, overflow: "hidden", backgroundColor: "#eae0e2", position: "relative" },
  slipImg: { width: "100%", height: "100%", resizeMode: "cover" },
  slipImgOverlay: { position: "absolute", inset: 0, backgroundColor: "rgba(167, 51, 85, 0.1)", justifyContent: "center", alignItems: "center" },
  slipInfo: { flex: 1, paddingLeft: 12, justifyContent: "center" },
  slipId: { fontSize: 14, fontWeight: "bold", color: "#1f1a1c" },
  slipAmount: { fontSize: 16, fontWeight: "900", color: "#a73355", marginVertical: 2 },
  slipDate: { fontSize: 10, color: "#837375", marginBottom: 8 },
  slipActions: { flexDirection: "row", gap: 8 },
  approveBtn: { flex: 1, borderRadius: 8, overflow: "hidden" },
  approveGradient: { paddingVertical: 6, alignItems: "center" },
  approveText: { color: "white", fontSize: 11, fontWeight: "bold" },
  rejectBtn: { backgroundColor: "#f5ebed", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, justifyContent: "center" },
  rejectText: { color: "#514345", fontSize: 11, fontWeight: "bold" },

  filterTabs: { flexDirection: "row", gap: 16, marginBottom: 16 },
  tab: { paddingBottom: 6, borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: "#a73355" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#837375" },
  tabTextActive: { color: "#a73355", fontWeight: "900" },

  searchRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF1F3",
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#1f1a1c" },
  filterIconButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#EAE0E2", justifyContent: "center", alignItems: "center" },

  billingList: { gap: 12 },
  billingCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.3)",
    elevation: 1,
  },
  billHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  billId: { fontSize: 13, fontWeight: "bold", color: "#1f1a1c", letterSpacing: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase" },
  billBody: { marginBottom: 16 },
  billAmount: { fontSize: 20, fontWeight: "900", color: "#1f1a1c", marginBottom: 6 },
  billMethodRow: { flexDirection: "row", alignItems: "center" },
  billMethod: { fontSize: 13, fontWeight: "600", color: "#514345", marginLeft: 6 },
  billDate: { fontSize: 12, color: "#837375" },
  billFooter: { alignItems: "flex-end", borderTopWidth: 1, borderTopColor: "rgba(214, 194, 196, 0.2)", paddingTop: 12 },
  printBtn: { borderRadius: 10, overflow: "hidden" },
  printGradient: { paddingHorizontal: 16, paddingVertical: 8, alignItems: "center" },
  printText: { color: "white", fontSize: 12, fontWeight: "bold" },
  printBtnDisabled: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: "rgba(131, 115, 117, 0.3)" },
  printTextDisabled: { color: "#837375", fontSize: 12, fontWeight: "bold", opacity: 0.5 },

  fabBtn: { position: "absolute", bottom: 100, right: 20, zIndex: 40, elevation: 8, shadowColor: "#a73355", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  fabGradient: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 248, 248, 0.95)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.2)",
    elevation: 20,
    shadowColor: "#a73355",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#F5EBED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navTextActive: { fontSize: 10, fontWeight: "bold", color: "#a73355", marginTop: 4 },
  navItem: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, opacity: 0.7 },
  navText: { fontSize: 10, fontWeight: "bold", color: "#837375", marginTop: 4 },
});