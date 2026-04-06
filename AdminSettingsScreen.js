import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminSettingsScreen({ setView }) {
  // State สำหรับปุ่มเปิด-ปิด 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  // ข้อมูลจำลองสำหรับบันทึกกิจกรรม (Audit Logs)
  const auditLogs = [
    {
      id: 1,
      user: "แอดมิน A",
      action: "แก้ไข",
      target: "CPE407",
      desc: "อัปเดตข้อมูลเมตาของหลักสูตร",
      time: "10:30 น.",
      date: "วันนี้",
      icon: "edit",
      iconColor: "#7b5455",
      iconBg: "rgba(123, 84, 85, 0.1)",
    },
    {
      id: 2,
      user: "ระบบ",
      action: "ลงทะเบียน",
      target: "ผู้ใช้ #892",
      desc: "การลงทะเบียนใหม่",
      time: "09:15 น.",
      date: "วันนี้",
      icon: "person-add",
      iconColor: "#a82d68",
      iconBg: "rgba(168, 45, 104, 0.1)",
    },
    {
      id: 3,
      user: "เจ้าหน้าที่ภัณฑารักษ์",
      action: "รีเซ็ต",
      target: "ข้อมูล API",
      desc: "อัปเดตความปลอดภัย",
      time: "เมื่อวานนี้",
      date: "23:45 น.",
      icon: "lock-reset",
      iconColor: "#ba1a1a",
      iconBg: "rgba(186, 26, 26, 0.1)",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Background Decoration */}
      <View style={styles.bgDecoration} />

      <SafeAreaView style={styles.safeArea}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="menu" size={28} color="#7b5455" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>ตั้งค่า</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=16" }}
              style={styles.profilePic}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Hero Section --- */}
          <View style={styles.heroSection}>
            <View>
              <Text style={styles.heroTitle}>ตั้งค่าระบบ</Text>
              <Text style={styles.heroDesc}>ปรับแต่งสภาพแวดล้อมดิจิทัลเพื่อการเรียนรู้อย่างละเอียด</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>สถานะระบบ: ปกติ</Text>
            </View>
          </View>

          {/* --- 2FA Settings Card --- */}
          <View style={styles.securityCard}>
            <View style={styles.securityIconBox}>
              <MaterialIcons name="security" size={24} color="#a73355" />
            </View>
            <Text style={styles.securityTitle}>การยืนยันตัวตนสองชั้น</Text>
            <Text style={styles.securityDesc}>เพิ่มการป้องกันชั้นที่สองให้กับบัญชีผู้ใช้ของคุณ</Text>
            
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>{is2FAEnabled ? "เปิดการป้องกัน" : "ปิดการป้องกัน"}</Text>
              <TouchableOpacity 
                style={[styles.toggleTrack, is2FAEnabled ? styles.trackActive : styles.trackInactive]}
                onPress={() => setIs2FAEnabled(!is2FAEnabled)}
                activeOpacity={0.8}
              >
                <View style={[styles.toggleThumb, is2FAEnabled ? styles.thumbActive : styles.thumbInactive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Role Management Section --- */}
          <View style={styles.roleSection}>
            <View style={styles.roleHeader}>
              <Text style={styles.sectionTitle}>จัดการบทบาท</Text>
              <TouchableOpacity>
                <Text style={styles.editRoleText}>แก้ไขสิทธิ์การใช้งาน</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.roleCardsContainer}>
              {/* Super Admin */}
              <View style={styles.roleCard}>
                <View style={styles.roleCardHeader}>
                  <MaterialIcons name="stars" size={24} color="#7b5455" />
                  <Text style={styles.roleCardTitle}>ซูเปอร์แอดมิน</Text>
                </View>
                <View style={styles.roleList}>
                  <View style={styles.roleItem}><MaterialIcons name="check-circle" size={16} color="#837375" /><Text style={styles.roleItemText}>เข้าถึงระบบได้ทั้งหมด</Text></View>
                  <View style={styles.roleItem}><MaterialIcons name="check-circle" size={16} color="#837375" /><Text style={styles.roleItemText}>ควบคุมด้านการเงิน</Text></View>
                  <View style={styles.roleItem}><MaterialIcons name="check-circle" size={16} color="#837375" /><Text style={styles.roleItemText}>จัดการบัญชีผู้ใช้</Text></View>
                </View>
              </View>

              {/* Staff */}
              <View style={styles.roleCard}>
                <View style={styles.roleCardHeader}>
                  <MaterialIcons name="badge" size={24} color="#837375" />
                  <Text style={styles.roleCardTitle}>เจ้าหน้าที่ภัณฑารักษ์</Text>
                </View>
                <View style={styles.roleList}>
                  <View style={styles.roleItem}><MaterialIcons name="check-circle" size={16} color="#837375" /><Text style={styles.roleItemText}>แก้ไขเนื้อหาหลักสูตร</Text></View>
                  <View style={styles.roleItem}><MaterialIcons name="check-circle" size={16} color="#837375" /><Text style={styles.roleItemText}>จัดการข้อมูลนักเรียน</Text></View>
                  <View style={[styles.roleItem, { opacity: 0.5 }]}><MaterialIcons name="cancel" size={16} color="#837375" /><Text style={styles.roleItemText}>ไม่มีสิทธิ์ตั้งค่าระบบ</Text></View>
                </View>
              </View>
            </View>
          </View>

          {/* --- Audit Logs Section --- */}
          <View style={styles.auditSection}>
            <View style={styles.auditHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Text style={styles.sectionTitle}>บันทึกกิจกรรม</Text>
                <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>สด</Text></View>
              </View>
              <TouchableOpacity><MaterialIcons name="refresh" size={24} color="#837375" /></TouchableOpacity>
            </View>

            <View style={styles.auditList}>
              {auditLogs.map((log) => (
                <View key={log.id} style={styles.auditItem}>
                  <View style={styles.auditLeft}>
                    <View style={[styles.auditIconBox, { backgroundColor: log.iconBg }]}>
                      <MaterialIcons name={log.icon} size={16} color={log.iconColor} />
                    </View>
                    <View>
                      <Text style={styles.auditActionTitle}>
                        {log.user} <Text style={{ fontWeight: 'normal', color: '#514345' }}>{log.action}</Text> {log.target}
                      </Text>
                      <Text style={styles.auditActionDesc}>{log.desc}</Text>
                    </View>
                  </View>
                  <View style={styles.auditRight}>
                    <Text style={styles.auditTime}>{log.time}</Text>
                    <Text style={styles.auditDate}>{log.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>

        {/* --- Bottom Navigation --- */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("DASHBOARD")}>
            <MaterialIcons name="dashboard" size={24} color="#837375" />
            <Text style={styles.navText}>แผง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("COURSE")}>
            <MaterialIcons name="auto-stories" size={24} color="#837375" />
            <Text style={styles.navText}>วิชา</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("USER")}>
            <MaterialIcons name="group" size={24} color="#837375" />
            <Text style={styles.navText}>ผู้ใช้</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("BILLING")}>
            <MaterialIcons name="payments" size={24} color="#837375" />
            <Text style={styles.navText}>จ่าย</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemActive}>
            <MaterialIcons name="settings" size={24} color="#a73355" />
            <Text style={styles.navTextActive}>ตั้งค่า</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F8" },
  bgDecoration: { position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -200 }, { translateY: -350 }], width: 400, height: 700, backgroundColor: "#ffdad9", opacity: 0.15, borderRadius: 200 },
  safeArea: { flex: 1 },
  
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "rgba(234, 224, 226, 0.5)", backgroundColor: "#FFF8F8", zIndex: 10 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconButton: { padding: 4, borderRadius: 20 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#7b5455" },
  profilePic: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(123, 84, 85, 0.2)" },
  
  scrollContent: { padding: 20, paddingBottom: 120 },

  heroSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 16 },
  heroTitle: { fontSize: 32, fontWeight: "900", color: "#1f1a1c", marginBottom: 8, letterSpacing: -0.5 },
  heroDesc: { fontSize: 14, color: "#514345", fontWeight: "500" },
  statusBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FBF1F3", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "rgba(214, 194, 196, 0.3)", gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" },
  statusText: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, color: "#514345" },

  securityCard: { backgroundColor: "#FBF1F3", padding: 24, borderRadius: 16, marginBottom: 24, overflow: "hidden" },
  securityIconBox: { width: 48, height: 48, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  securityTitle: { fontSize: 18, fontWeight: "bold", color: "#1f1a1c", marginBottom: 8 },
  securityDesc: { fontSize: 13, color: "#514345", lineHeight: 20, marginBottom: 24 },
  toggleContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(255,255,255,0.5)", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "rgba(214, 194, 196, 0.2)" },
  toggleLabel: { fontSize: 11, fontWeight: "bold", color: "#a73355", textTransform: "uppercase", letterSpacing: 1 },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, padding: 2, justifyContent: "center" },
  trackActive: { backgroundColor: "#a73355" },
  trackInactive: { backgroundColor: "#d6c2c4" },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#ffffff", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
  thumbActive: { alignSelf: "flex-end" },
  thumbInactive: { alignSelf: "flex-start" },

  roleSection: { backgroundColor: "rgba(239, 230, 232, 0.4)", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "rgba(214, 194, 196, 0.2)", marginBottom: 24 },
  roleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1f1a1c" },
  editRoleText: { fontSize: 13, fontWeight: "bold", color: "#a82d68" },
  roleCardsContainer: { gap: 16 },
  roleCard: { backgroundColor: "rgba(255,255,255,0.7)", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "rgba(214, 194, 196, 0.2)" },
  roleCardHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  roleCardTitle: { fontSize: 16, fontWeight: "bold", color: "#1f1a1c" },
  roleList: { gap: 8 },
  roleItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  roleItemText: { fontSize: 12, color: "#514345" },

  auditSection: { backgroundColor: "#f5ebed", padding: 20, borderRadius: 16, marginBottom: 24 },
  auditHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  liveBadge: { backgroundColor: "#ff7799", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  liveBadgeText: { fontSize: 10, fontWeight: "bold", color: "#ffffff", textTransform: "uppercase", letterSpacing: 1 },
  auditList: { gap: 0 },
  auditItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "rgba(214, 194, 196, 0.3)" },
  auditLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  auditIconBox: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },
  auditActionTitle: { fontSize: 13, fontWeight: "bold", color: "#1f1a1c", marginBottom: 2 },
  auditActionDesc: { fontSize: 10, color: "#514345", textTransform: "uppercase" },
  auditRight: { alignItems: "flex-end" },
  auditTime: { fontSize: 11, fontWeight: "bold", color: "#a73355", marginBottom: 2 },
  auditDate: { fontSize: 10, color: "#837375" },

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