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

export default function AdminUserScreen({ setView }) {
  const [searchQuery, setSearchQuery] = useState("");

  // 🌟 ข้อมูลจำลองสำหรับผู้ใช้งาน (ดึงตาม HTML ต้นฉบับ)
  const userData = [
    {
      id: "66000320",
      name: "อบัสดรูน แมหะ",
      faculty: "จดหมายเหตุ",
      status: "สำเร็จ",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "66014266",
      name: "ณัฐเศรษฐ์ มีสมสินธุ์",
      faculty: "มนุษยศาสตร์ดิจิทัล",
      status: "รอดำเนินการ",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: "66085721",
      name: "วุฒิไกร แย้มพุ่ม",
      faculty: "ปรัชญาคลาสสิก",
      status: "สำเร็จ",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "66040408",
      name: "พชรพล ฤกษนันทน์",
      faculty: "ภัณฑารักษ์ศิลปะ",
      status: "ยกเลิก",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "66085365",
      name: "ฉัตรเพชร การิสุข",
      faculty: "ภาษาศาสตร์",
      status: "สำเร็จ",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  ];

  // ฟังก์ชันตัวช่วยสำหรับกำหนดสีตามสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case "สำเร็จ":
        return { bg: "#d1fae5", text: "#047857", dot: "#10b981" }; // Emerald
      case "รอดำเนินการ":
        return { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b" }; // Amber
      case "ยกเลิก":
        return { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" }; // Red
      default:
        return { bg: "#f1f5f9", text: "#52525b", dot: "#71717a" }; // Zinc
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="menu" size={28} color="#7b5455" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>จัดการผู้ใช้งาน</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.profilePic}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Search & Filters --- */}
          <View style={styles.filterSection}>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#837375" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="ค้นหาด้วยชื่อหรือรหัส..."
                placeholderTextColor="#837375"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterChipText}>คณะ</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#a73355" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterChipText}>ชั้นปี</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#a73355" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterBtnPrimary}>
                <MaterialIcons name="filter-list" size={16} color="#ffffff" />
                <Text style={styles.filterBtnText}>กรองข้อมูล</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* --- Users List (แปลงจาก Table เป็น Card สำหรับมือถือ) --- */}
          <View style={styles.userListContainer}>
            {userData.map((user, index) => {
              const statusStyle = getStatusStyle(user.status);
              
              return (
                <View key={index} style={styles.userCard}>
                  {/* รูปโปรไฟล์ */}
                  <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                  
                  {/* ข้อมูล */}
                  <View style={styles.userInfo}>
                    <Text style={styles.userId}>{user.id}</Text>
                    <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
                    <Text style={styles.userFaculty} numberOfLines={1}>{user.faculty}</Text>
                    
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <View style={[styles.statusDot, { backgroundColor: statusStyle.dot }]} />
                      <Text style={[styles.statusText, { color: statusStyle.text }]}>{user.status}</Text>
                    </View>
                  </View>

                  {/* ปุ่ม Action */}
                  <View style={styles.actionContainer}>
                    {user.status === "รอดำเนินการ" ? (
                      <View style={styles.pendingActions}>
                        <TouchableOpacity style={styles.approveBtn}>
                          <MaterialIcons name="check" size={18} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectBtn}>
                          <MaterialIcons name="close" size={18} color="#93000a" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.moreBtn}>
                        <MaterialIcons name="more-vert" size={24} color="#837375" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

        </ScrollView>

        {/* --- Floating Action Button (FAB) --- */}
        <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9}>
          <LinearGradient
            colors={["#7b5455", "#a73355"]}
            style={styles.fabGradient}
          >
            <MaterialIcons name="person-add" size={28} color="#ffffff" />
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
          <TouchableOpacity style={styles.navItemActive}>
            <MaterialIcons name="group" size={24} color="#a73355" />
            <Text style={styles.navTextActive}>ผู้ใช้</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="payments" size={24} color="#837375" />
            <Text style={styles.navText}>จ่าย</Text>
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
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#1f1a1c" },
  profilePic: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(167, 51, 85, 0.2)" },
  
  scrollContent: { padding: 20, paddingBottom: 120 },

  filterSection: { marginBottom: 24 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF1F3",
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 15, color: "#1f1a1c", fontWeight: "500" },
  
  chipScroll: { flexDirection: "row", overflow: "visible" },
  filterChip: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#F5EBED", 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginRight: 10 
  },
  filterChipText: { fontSize: 12, fontWeight: "bold", color: "#a73355", textTransform: "uppercase", marginRight: 4 },
  filterBtnPrimary: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#7b5455", 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#7b5455", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4
  },
  filterBtnText: { fontSize: 12, fontWeight: "bold", color: "#ffffff", marginLeft: 6, textTransform: "uppercase" },

  userListContainer: { gap: 12 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.3)",
    elevation: 1,
  },
  userAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#eae0e2" },
  userInfo: { flex: 1, paddingHorizontal: 12 },
  userId: { fontSize: 12, fontWeight: "bold", color: "#a73355", letterSpacing: 1, marginBottom: 2 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#1f1a1c", marginBottom: 2 },
  userFaculty: { fontSize: 12, color: "#514345", marginBottom: 8 },
  
  statusBadge: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: "bold" },

  actionContainer: { justifyContent: "center", alignItems: "flex-end" },
  moreBtn: { padding: 8 },
  pendingActions: { flexDirection: "row", gap: 8 },
  approveBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#a73355", alignItems: "center", justifyContent: "center" },
  rejectBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#ffdad6", alignItems: "center", justifyContent: "center" },

  fabBtn: { position: "absolute", bottom: 100, right: 20, zIndex: 40, elevation: 8, shadowColor: "#7b5455", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
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