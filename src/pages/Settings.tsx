import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Save, 
  View, 
  Bell, 
  Database,
  Mail,
  Lock,
  Globe,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { settings as defaultSettings } from "@/dummyData";

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const handleSave = () => {
    console.log("Saving settings:", settings);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({...prev, [key]: value}));
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and security settings</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => updateSetting('systemName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Default Language</Label>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via SMS</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="biasAlerts">Bias Alerts</Label>
                <p className="text-sm text-gray-600">Real-time bias detection alerts</p>
              </div>
              <Switch
                id="biasAlerts"
                checked={settings.biasAlerts}
                onCheckedChange={(checked) => updateSetting('biasAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemUpdates">System Updates</Label>
                <p className="text-sm text-gray-600">Notifications about system updates</p>
              </div>
              <Switch
                id="systemUpdates"
                checked={settings.systemUpdates}
                onCheckedChange={(checked) => updateSetting('systemUpdates', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <View className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>Security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select value={settings.passwordPolicy} onValueChange={(value) => updateSetting('passwordPolicy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (12+ characters, mixed case)</SelectItem>
                  <SelectItem value="complex">Complex (16+ characters, symbols)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Require 2FA for all users</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>AI Configuration</span>
            </CardTitle>
            <CardDescription>AI and bias detection settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="biasThreshold">Bias Detection Threshold</Label>
              <Input
                id="biasThreshold"
                type="number"
                min="0"
                max="100"
                value={settings.biasThreshold}
                onChange={(e) => updateSetting('biasThreshold', e.target.value)}
              />
              <p className="text-sm text-gray-600">Score below which bias alerts are triggered</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoReportGeneration">Auto Report Generation</Label>
                <p className="text-sm text-gray-600">Generate reports automatically</p>
              </div>
              <Switch
                id="autoReportGeneration"
                checked={settings.autoReportGeneration}
                onCheckedChange={(checked) => updateSetting('autoReportGeneration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="suggestedInterviewers">AI Interviewer Suggestions</Label>
                <p className="text-sm text-gray-600">AI-powered interviewer matching</p>
              </div>
              <Switch
                id="suggestedInterviewers"
                checked={settings.suggestedInterviewers}
                onCheckedChange={(checked) => updateSetting('suggestedInterviewers', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="realTimeCoaching">Real-time Coaching</Label>
                <p className="text-sm text-gray-600">Live bias coaching during interviews</p>
              </div>
              <Switch
                id="realTimeCoaching"
                checked={settings.realTimeCoaching}
                onCheckedChange={(checked) => updateSetting('realTimeCoaching', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>Data retention and privacy settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => updateSetting('dataRetention', e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">How long to keep interview data</p>
            </div>
            <div>
              <Label htmlFor="anonymizationLevel">Anonymization Level</Label>
              <Select value={settings.anonymizationLevel} onValueChange={(value) => updateSetting('anonymizationLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">Resume anonymization level</p>
            </div>
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">How often to backup data</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-600">Reset All Settings</h4>
              <p className="text-sm text-gray-600">Reset all settings to default values</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-600">
              Reset Settings
            </Button>
          </div>
          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-600">Delete All Data</h4>
              <p className="text-sm text-gray-600">Permanently delete all interview data and reports</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-600">
              Delete Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
