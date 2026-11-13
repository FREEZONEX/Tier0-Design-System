import { useEffect, useState, type ReactNode } from 'react';
import { CircleAlert, Copy, Info, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@tier0/ui/components/ui/button';
import { Input } from '@tier0/ui/components/ui/input';
import { Textarea } from '@tier0/ui/components/ui/textarea';
import { Label } from '@tier0/ui/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tier0/ui/components/ui/select';
import { Checkbox } from '@tier0/ui/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@tier0/ui/components/ui/radio-group';
import { Switch } from '@tier0/ui/components/ui/switch';
import { Slider } from '@tier0/ui/components/ui/slider';
import { Badge } from '@tier0/ui/components/ui/badge';
import { AntTag } from '@tier0/ui/components/ant-tag';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tier0/ui/components/ui/tabs';
import CnTabs from '@tier0/ui/components/cn-tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tier0/ui/components/ui/table';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@tier0/ui/components/ui/card';
import ComStatsCard from '@tier0/ui/components/com-stats-card';
import { Alert, AlertDescription, AlertTitle } from '@tier0/ui/components/ui/alert';
import { Progress } from '@tier0/ui/components/ui/progress';
import { Skeleton } from '@tier0/ui/components/ui/skeleton';
import ComAvatar from '@tier0/ui/components/com-avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@tier0/ui/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@tier0/ui/components/ui/dropdown-menu';
import ComConfirmDialog from '@tier0/ui/components/com-confirm-dialog';

// 每个预览只用 @tier0/ui 的组件，不写自定义样式（布局用的 flex / gap 除外）
const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">
    <span className="text-muted-foreground w-12 shrink-0 text-xs">{label}</span>
    {children}
  </div>
);

const PREVIEWS: Record<string, () => ReactNode> = {
  button: () => (
    <div className="grid gap-4">
      <Row label="变体">
        <Button>default</Button><Button variant="primary">primary</Button><Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button><Button variant="ghost">ghost</Button><Button variant="destructive">destructive</Button><Button variant="link">link</Button>
      </Row>
      <Row label="尺寸"><Button size="sm">sm 32</Button><Button size="md">md 36</Button><Button size="lg">lg 40</Button><Button size="icon" variant="outline" aria-label="新建"><Plus /></Button></Row>
      <Row label="状态"><Button icon={<Plus />}>新建数据源</Button><Button loading>运行中</Button><Button disabled>不可用</Button></Row>
    </div>
  ),
  input: () => (
    <div className="grid w-80 max-w-full gap-4">
      <div className="grid gap-2"><Label htmlFor="in1">数据源名称</Label><Input id="in1" placeholder="例如 PLC-S7-01" /></div>
      <div className="grid gap-2"><Label htmlFor="in2">端点地址</Label><Input id="in2" aria-invalid defaultValue="opc.tcp://" /><span className="text-destructive text-xs">地址格式不正确</span></div>
      <div className="grid gap-2"><Label htmlFor="in3">搜索</Label><Input id="in3" icon={<Search className="size-4" />} placeholder="搜索数据路径" /></div>
      <div className="grid gap-2"><Label htmlFor="in4">描述</Label><Textarea id="in4" placeholder="补充说明" /></div>
      <div className="grid gap-2"><Label htmlFor="in5">只读</Label><Input id="in5" defaultValue="Factory-A / Line-01" disabled /></div>
    </div>
  ),
  select: () => (
    <div className="grid w-64 gap-2">
      <Label>协议</Label>
      <Select defaultValue="opcua">
        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="opcua">OPC UA</SelectItem><SelectItem value="modbus">Modbus TCP</SelectItem><SelectItem value="mqtt">MQTT</SelectItem></SelectContent>
      </Select>
    </div>
  ),
  choice: () => (
    <div className="grid gap-4">
      <Row label="复选"><Label className="font-normal"><Checkbox defaultChecked />订阅实时数据</Label><Label className="font-normal"><Checkbox />保留历史</Label></Row>
      <Row label="单选">
        <RadioGroup defaultValue="device" className="flex gap-4">
          <Label className="font-normal"><RadioGroupItem value="device" />按设备</Label><Label className="font-normal"><RadioGroupItem value="step" />按工序</Label>
        </RadioGroup>
      </Row>
      <Row label="开关"><Label className="font-normal"><Switch defaultChecked />自动重连</Label><Label className="font-normal"><Switch />告警通知</Label></Row>
      <Row label="滑块"><Slider defaultValue={[60]} max={100} className="w-56" aria-label="采样频率" /></Row>
    </div>
  ),
  badge: () => (
    <div className="grid gap-4">
      <Row label="Badge"><Badge>default</Badge><Badge variant="secondary">secondary</Badge><Badge variant="outline">outline</Badge><Badge variant="destructive">destructive</Badge></Row>
      <Row label="AntTag"><AntTag theme="default">待处理</AntTag><AntTag theme="blue">进行中</AntTag><AntTag theme="success">已完成</AntTag><AntTag theme="warning">接近上限</AntTag><AntTag theme="error">失败</AntTag><AntTag theme="fx-green">实时</AntTag></Row>
    </div>
  ),
  tabs: () => (
    <div className="grid w-[480px] max-w-full gap-6">
      <CnTabs defaultValue="metrics" items={[{ key: 'metrics', label: '指标' }, { key: 'state', label: '状态' }, { key: 'action', label: '动作' }]} />
      <Tabs defaultValue="metrics">
        <TabsList><TabsTrigger value="metrics">指标</TabsTrigger><TabsTrigger value="state">状态</TabsTrigger><TabsTrigger value="action">动作</TabsTrigger></TabsList>
        <TabsContent value="metrics" className="text-muted-foreground pt-2 text-sm">温度、压力、转速</TabsContent>
        <TabsContent value="state" className="text-muted-foreground pt-2 text-sm">运行、空闲、停机</TabsContent>
        <TabsContent value="action" className="text-muted-foreground pt-2 text-sm">启动、停止、复位</TabsContent>
      </Tabs>
    </div>
  ),
  table: () => (
    <div className="border-border w-[520px] max-w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader><TableRow><TableHead className="pl-4">设备</TableHead><TableHead>产线</TableHead><TableHead>状态</TableHead><TableHead className="pr-4 text-right">温度 °C</TableHead></TableRow></TableHeader>
        <TableBody>
          <TableRow><TableCell className="pl-4">CNC-01</TableCell><TableCell>Line-01</TableCell><TableCell><AntTag theme="success">运行</AntTag></TableCell><TableCell className="pr-4 text-right tabular-nums">61.2</TableCell></TableRow>
          <TableRow data-state="selected"><TableCell className="pl-4">CNC-03</TableCell><TableCell>Line-01</TableCell><TableCell><AntTag theme="warning">过热</AntTag></TableCell><TableCell className="pr-4 text-right tabular-nums">72.4</TableCell></TableRow>
          <TableRow><TableCell className="pl-4">CNC-04</TableCell><TableCell>Line-02</TableCell><TableCell><AntTag theme="error">离线</AntTag></TableCell><TableCell className="pr-4 text-right">—</TableCell></TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  card: () => (
    <div className="flex flex-wrap gap-6">
      {/* 产品里的写法：apps/ 中的 Card 几乎都覆盖为 rounded-md + border + shadow-none，不用组件默认的 rounded-xl + shadow */}
      <Card className="border-border w-80 rounded-md border shadow-none">
        <CardHeader><CardTitle>Line-01</CardTitle><CardDescription>3 台设备在线，1 台告警</CardDescription></CardHeader>
        <CardFooter className="justify-end gap-2"><Button variant="outline">查看</Button><Button>运行 Agent</Button></CardFooter>
      </Card>
      <div className="w-72"><ComStatsCard label="今日接入数据点" value="128,406" /></div>
    </div>
  ),
  alert: () => (
    <div className="grid w-[480px] max-w-full gap-3">
      <Alert><Info /><AlertTitle>数据源已更新</AlertTitle><AlertDescription>新配置将在下一次采样时生效。</AlertDescription></Alert>
      <Alert variant="destructive"><CircleAlert /><AlertTitle>连接失败</AlertTitle><AlertDescription>无法访问 opc.tcp://10.0.0.12。</AlertDescription></Alert>
      <Alert variant="error"><CircleAlert /><AlertTitle>配额已用完</AlertTitle><AlertDescription>升级套餐以继续接入数据点。</AlertDescription></Alert>
    </div>
  ),
  feedback: () => (
    <div className="grid gap-5">
      <Row label="进度"><Progress value={68} className="w-56" /></Row>
      <Row label="骨架"><div className="grid w-56 gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div></Row>
      <Row label="头像"><ComAvatar name="林一" /><ComAvatar name="Alex Lin" /><ComAvatar name="Mark" /><ComAvatar name="Yuki" /></Row>
      <Row label="气泡">
        <Tooltip defaultOpen><TooltipTrigger asChild><Button variant="outline" size="icon" aria-label="复制数据路径"><Copy /></Button></TooltipTrigger><TooltipContent side="right">复制数据路径</TooltipContent></Tooltip>
      </Row>
    </div>
  ),
  menu: () => (
    <div className="h-56">
      <DropdownMenu defaultOpen modal={false}>
        <DropdownMenuTrigger asChild><Button variant="outline">数据源操作</Button></DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>重命名<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>复制路径</DropdownMenuItem>
          <DropdownMenuItem>导出</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><Trash2 />删除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  dialog: () => <DialogDemo />,
};

function DialogDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-72 items-start">
      <Button variant="outline" onClick={() => setOpen(true)}>断开数据源</Button>
      <ComConfirmDialog open={open} onOpenChange={setOpen} onCancel={() => setOpen(false)} onSubmit={() => setOpen(false)}
        title="断开数据源？" description="PLC-S7-01 的数据将停止同步，已接入的历史数据保留。" okText="断开" />
    </div>
  );
}

export default function App() {
  const [id, setId] = useState(() => location.hash.slice(1).split(':')[0]);
  useEffect(() => { const f = () => setId(location.hash.slice(1).split(':')[0]); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  const P = PREVIEWS[id];
  return <div className="flex justify-center p-8">{P ? <P /> : <p className="text-muted-foreground text-sm">没有这个预览：{id || '（空）'}</p>}</div>;
}
