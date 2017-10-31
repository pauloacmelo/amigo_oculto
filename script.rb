require 'aws-sdk'
require 'csv'

### Use this code on WhatsApp web to list users in a group
# phones = [].slice.call(document.getElementsByClassName('drawer-body')[0].getElementsByClassName('avatar')).filter(avatar => /u=\d{13}/g.exec(avatar.children[0].children[0].src)).map(avatar => '+' + /u=\d{13}/g.exec(avatar.children[0].children[0].src)[0].slice(2))
# names = [].slice.call(document.getElementsByClassName('drawer-body')[0].getElementsByClassName('chat-title')).slice(2, -2).map(x => x.children[0].title)
# JSON.stringify(phones.map((x, i) => [phones[i], names[i]]))

def send_messages messages
  # sns = Aws::SNS::Client.new({"region": "us-west-2"})
  messages.each do |message|
    # sns.publish(phone_number: message.to, message: message.text)
    puts message
  end
end

messages = []
participants = CSV.read("participants.csv").reject{|row| row[2] == 'AUDITOR'}
auditor = CSV.read("participants.csv").select{|row| row[2] == 'AUDITOR'}.first

shuffled = (0...participants.size).map(&:to_i).shuffle
shuffled.each_with_index do |from_index, i|
  to = participants[shuffled[(i+1)%participants.size]]
  from = participants[from_index]
  messages << {
    to: from[1],
    text: "Olá #{from[0]},\nSeu amigo oculto é o(a) #{to[0]}",
    direction: "#{from[0]} => #{to[0]}",
  }
end
messages << {to: auditor[1], text: messages.map{|m| m[:direction]}.join("\n")}

send_messages(messages)
